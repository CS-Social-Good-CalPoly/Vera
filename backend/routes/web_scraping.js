const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const IndResources = require('../models/IndividualResources')
const router = express.Router();

router.put('/scrape-covid19-resource', async (req, res) => {
    try {
        const url = 'https://chw.calpoly.edu/health/Covid-19';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Debugging: Check if page loaded
        console.log("Page loaded successfully");

        // Extract Title
        const Title = $('h1.page-title').text().trim();
        console.log("Title:", Title);

        // Extract Image URL
        let ImageURL = $('div.field-item.even img').attr('src') || '';
        let ImageAltText = $('div.field-item.even img').attr('alt') || '';
        console.log("Image URL:", ImageURL);
        console.log("Image Alt:", ImageAltText);

        // Extracting the building name under "Location" h3
        const BuildingName = $('h3:contains("Location")')
        .next('p')
        .find('a')
        .text()
        .trim();
        console.log("Building Name:", BuildingName);

        // Extract Paragraph
        const ParagraphText = $('div.clear').first().text().trim();
        console.log("Paragraph Text:", ParagraphText);

        // Extract Phone Number
        const PhoneNumber = $('a[href^="tel"]').first().text().trim();
        console.log("Phone Number:", PhoneNumber);

        // Extract List of Hours
        const ListOfHours = [];
        $('p:contains("Hours")').each((i, elem) => {
            const text = $(elem).text().replace('Hours', '').trim().split('Building')[0];
            if (text) ListOfHours.push(text);
        });
        console.log("List of Hours:", ListOfHours);

        // Extract extra info as an array of objects { text, url }
        const ExtraInfo = [];
        $('h2:has(img[alt="Covid 19 testing resources"])')
            .next('ul')
            .find('li')
            .each((index, element) => {
                const fullText = $(element).text().trim(); // Extract only text
                ExtraInfo.push(fullText); // Push only the text, no links
            });

        console.log("Extra Info:", ExtraInfo);

        // Upsert into MongoDB
        const updatedCovidResource = await IndResources.findOneAndUpdate(
            { ResourceURL: url }, // Search by the resource URL
            {
                Title,
                ImageURL,
                ImageAltText,
                BuildingName,
                ParagraphText,
                PhoneNumber,
                ListOfHours,
                ExtraInfo,
                ResourceURL: url
            },
            { new: true, upsert: true } // Create if doesn't exist, update if it does
        );

        res.status(200).json({
            message: "Scraped data successfully stored in MongoDB",
            data: updatedCovidResource
        });

    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ error: "An error occurred while scraping the resource." });
    }
});

module.exports = router;
