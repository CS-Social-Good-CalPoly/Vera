const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()
const IndResources = require('../models/IndividualResources')
const CollegeMajors = require('../models/CollegeMajors')

// Major and Colleges

// PUT route for updating all the colleges
// Use to sync all 6 colleges
router.put('/sync_colleges', async (req, res) => {
    try {
        // List of colleges
        const colleges = ['CAFES', 'CAED', 'CLA', 'COSAM', 'CENG', 'OCOB']

        // Iterate over the colleges and update the database
        for (const college of colleges) {
            // call the college_majors route to update the college
            await axios.put(
                'http://localhost:3001/web_scrapping/college_majors',
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

        const suffixes = {
            CAFES: '/collegeofagriculturefoodenvironmentalsciences/',
            CAED: '/collegeofarchitectureandenvironmentaldesign/',
            CLA: '/collegeofliberalarts/',
            COSAM: '/collegeofsciencemathematics/',
            CENG: '/collegeofengineering/',
            OCOB: '/orfaleacollegeofbusiness/',
        }

        // Check if the college is valid
        if (!(college in suffixes)) {
            return res.status(400).send('Invalid college')
        }

        // Get the total url
        const scrapping_url =
            'https://catalog.calpoly.edu/collegesandprograms' +
            suffixes[college]

        const response = await axios.get(scrapping_url)
        const $ = cheerio.load(response.data)

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
                        const degree = $degreeCell.text().trim().toUpperCase() // Get degree and convert to uppercase for case-insensitivity
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
