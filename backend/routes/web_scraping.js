const express = require('express')
const axios = require("axios");
const cheerio = require("cheerio");
// const mongoose = require("mongoose");

const router = express.Router()
const IndResources = require('../models/IndividualResources')

// Gender Affiriming Care
router.put('/gender-affirming-care', async (req, res) => {
    const url = 'https://chw.calpoly.edu/gender-affirming-care';

    try {
        let genderAffirmingId = '67a181d68f5dcda530f9ead7';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // extract data
        const title = $('h1.page-title').text().trim();
        const image = $('p[id="subH1"]').children('img').attr('src') || "";
        const imageAltText = $('p[id="subH1"]').children('img').attr('alt') || "No Alt Text";

        const paragraphs = [];
        $('div[class="field-item even"]').children('p').each((i, elem) => {
            const text = $(elem).text().trim();
            if (text.length > 0) paragraphs.push(text);
        });

        const aboutUs = [];
        $('div[class="widget"] ul.cluster li p').each((_index, element) => {
            aboutUs.push($(element).text().trim());
        });

        // check if resource already exists
        let existingResource = await IndResources.findOne({ ResourceURL: url });

        if (existingResource) {
            existingResource.ImageURL = image;
            existingResource.ImageAltText = imageAltText;
            existingResource.Title = title;
            existingResource.BuildingName = aboutUs[0] || "Unknown Building";
            existingResource.ParagraphText = paragraphs.join('\n\n');
            existingResource.PhoneNumber = aboutUs[1] || "No Phone Number Found";
            existingResource.LastUpdate = new Date();
            existingResource.ListOfHours = aboutUs.slice(2);
            existingResource.ExtraInfo = "Additional information extracted here...";

            await existingResource.save();
            return res.json({ message: "Resource updated successfully", data: existingResource });
        } 

        // create new resource if no existing one
        const newResource = new IndResources({
            _id: genderAffirmingId,
            ImageURL: image,
            ImageAltText: imageAltText,
            Title: title,
            BuildingName: aboutUs[0] || "Unknown Building",
            ParagraphText: paragraphs.join('\n\n'),
            PhoneNumber: aboutUs[1] || "No Phone Number Found",
            ResourceURL: url,
            LastUpdate: new Date(),
            Category: 'Health Services',
            ListOfHours: aboutUs.slice(2),
            ExtraInfo: "Additional information extracted here...",
        });

        const savedResource = await newResource.save();
        return res.json({ message: "Resource created successfully", data: savedResource });

    } catch (error) {
        console.error('Scraping failed:', error.message);
        res.status(500).send('Error fetching Gender Affirming Care data: ' + error.message);
    }
});

module.exports = router;