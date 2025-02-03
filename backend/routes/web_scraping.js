const express = require('express')
const router = express.Router()
const axios = require('axios');
const cheerio = require('cheerio');
const IndResources = require('../models/IndividualResources')

/* SEXUAL REPRODUCTIVE HEALTH */

/*
router.get('/colleges-and-majors', async (req, res) => {
    try {
        const response = await axios.get(
            'https://www.calpoly.edu/colleges-departments-and-majors',
        )
        const $ = cheerio.load(response.data)
        const college_dict = {}

        $('h2').each((index, element) => {
            const college_name = $(element).text().trim()
            if (college_name.toLowerCase().includes('college')) {
                const $collegeSection = $(element).nextUntil('h2')
                $collegeSection.find('a').each((index, element) => {
                    const major_name = $(element).text().trim()
                    if (
                        major_name.toLowerCase().includes('major') &&
                        major_name !== 'Find a major'
                    ) {
                        college_dict[major_name.replace('Major', '').trim()] =
                            college_name
                    }
                })
            }
        })

        res.json(college_dict)
    } catch (error) {
        console.error('Scraping failed:', error)
        res.status(500).send('Error fetching college data')
    }
})
*/

/*
router.put('/individual-resources', async (req, res) => {
    try {
        const { tokenID, storyID } = req.body
        const token = await Tokens.findOne({ Value: { $eq: tokenID } })

        if (!token) {
            return res.status(404).json({ message: 'Token not found' })
        }

        // checks to see if the storyID already exists in the story array
        if (token.AssociatedStories.includes(storyID)) {
            res.status(400).json({
                message: 'Associated Story ID already exists in token',
            })
        } else {
            token.AssociatedStories.push(storyID)
            const updatedToken = await token.save()
            res.status(200).json(updatedToken)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
    */

// Function to scrape data and send a PUT request
router.put('/sexual-reproductive-health', async (req, res) => {
    try {
        // taken from the database once the record was added to the collection already
        let health_id = '67a0515f5ad4b6e0938cd2d5'

        // fetch HTML and extract data
        const response = await axios.get('https://chw.calpoly.edu/health/sexual-reproductive-health-services');
        const $ = cheerio.load(response.data);

        // extract header information
        const title =
            ($('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            $('meta[name="title"]').attr('content')).substring(1)
        const url = $('meta[property="og:url"]').attr('content')

        // extract image information
        const image = $('p[id="subH1"]')
            .children('img')
            .attr('src')
        const image_alt = $('p[id="subH1"]')
            .children('img')
            .attr('alt')

        // extract paragraph text
        const paragraphs = [];
        $('div[class="field-item even"]').children('p').each((i, elem) => {
            const $text = $(elem).text().trim()
            if ($text.length > 0) {
                paragraphs.push($text);
            }
        });

        // extract extra info (headers)
        const extraInfo = []
        $('div[class="field-item even"]')
            .children('[id^="header-"]')
            .children('img')
            .each((i, elem) => {
            extraInfo.push($(elem).attr('src'));
        });

        // extract info from About Us widget
        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g
            
        const aboutUs = []
        $('div[class="widget"]')
            .children('ul[class="cluster"]')
            .find('li')
            .each((_index, element) => {
                const $text = $(element).children('p').text().trim()
                const match = $text.match(phoneRegex);
                aboutUs.push(match ? match[0] : $text);
            })

        // construct object to store in the database
        const newResource = new IndResources({
            _id: health_id,
            ImageURL: image,
            ImageAltText: image_alt,
            Title: title,
            BuildingName: aboutUs[0],
            ParagraphText: paragraphs.join('\n\n'),
            PhoneNumber: aboutUs[1],
            ResourceURL: url,
            LastUpdate: new Date(),
            Category: 'Health Services',
            ListOfHours: aboutUs[2],
            ExtraInfo: extraInfo,
        })

        // ensure this page has been included in the db before and update it
        // if this fails, we can add a new record to the db using IndResources.insertMany()
        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: health_id },
            newResource,
            { new: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // respond with the updated resource
        res.json(newResource)

    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Sexual Reproductive Health data')
    }
})

module.exports = router