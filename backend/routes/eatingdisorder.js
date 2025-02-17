const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()
const TreatmentrecoverySchema = require('../models/Treatmentrecovery')

// Major and Colleges

// global list of colleges
// order matters since we use it to get the sub url for each college by index
// this should reflect the order of colleges in the catalog (https://catalog.calpoly.edu/collegesanddepartments/)
// const colleges = ['CAFES', 'CAED', 'OCOB', 'CENG', 'CLA', 'COSAM']

router.get('/test', async (req, res) => {
    res.json({ message: 'scraper is working' })
})

// PUT route for updating all the colleges
// Use to sync all 6 colleges
router.put('/eating_disorder_treatment', async (req, res) => {
    try {
        // Iterate over the colleges and update the database
        for (const college of colleges) {
            // call the college_majors route to update the college
            await axios.put(
                'http://localhost:3001/colleges_scraper/college_majors',
                { college },
            )
        }
        res.json({ message: 'Colleges synced successfully' })
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error syncing College data')
    }
})

// PUT route for updating colleges and majors
// Scrape the data for a specific college (in the body)
router.put('/college_majors', async (req, res) => {
    try {
        // Extract the college and majors from the request body
        const { college } = req.body

        // Load sub urls for each college in colleges list
        const parent_url = 'https://catalog.calpoly.edu/collegesanddepartments/'
        const parentResponse = await axios.get(parent_url)
        let $ = cheerio.load(parentResponse.data)
        let urlSuffixes = {}
        $('p')
            .find('a')
            .each((_index, element) => {
                const $collegeUrl = $(element).attr('href')
                const collegeName = colleges[_index]
                if (collegeName) {
                    urlSuffixes[collegeName] = $collegeUrl
                }
            })

        // Check if the college in the body is valid
        if (!(college in urlSuffixes)) {
            return res.status(400).send('Invalid college')
        }

        // Get the complete url to scrape for majors
        const scrapping_url =
            'https://catalog.calpoly.edu' + urlSuffixes[college]

        const response = await axios.get(scrapping_url)
        $ = cheerio.load(response.data)

        // Extract the majors from the page
        const BSMSregex =
            /(?:^|\s*,\s*)(BS|MS|MBA|BA|BLA|BArch)\S*(?:$|\s*,\s*)/i
        const majorsList = []

        // Select only the first table with the summary of "Program Names"
        $('table[summary="Program Names"]')
            .first()
            .find('td')
            .each((_index, element) => {
                if (_index % 2 == 0) {
                    // check if the second element (program descripition) contains "BS" or "MS"
                    // if we want minors, or specializations then we can remove this check
                    const $major = $(element).text().trim()
                    const $degreeCell = $(element).next() // Get the next sibling <td>
                    if ($degreeCell.length > 0) {
                        const degree = $degreeCell.text().trim().toUpperCase()
                        if (
                            BSMSregex.test(degree) &&
                            !degree.includes('-MS') &&
                            !degree.includes('-BS')
                        ) {
                            majorsList.push($major)
                        }
                    }
                }
            })

        // Upsert the data into the database
        const updatedCollegeMajors = await CollegeMajors.updateOne(
            { College: college },
            { $set: { Majors: majorsList } },
            { upsert: true, new: true },
        )

        if (!updatedCollegeMajors) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(updatedCollegeMajors)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching College data')
    }
})

module.exports = router