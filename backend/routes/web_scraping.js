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
        let ImageAltText = $('div.field-item.even img').attr('alt').trim() || '';
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

// Gender Affiriming Care
router.put('/gender-affirming-care', async (req, res) => {
    const url = 'https://chw.calpoly.edu/gender-affirming-care';

    try {
        let genderAffirmingId = '67a181d68f5dcda530f9ead7';

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // extract title,image, image alt
        const title = $('h1.page-title').text().trim();
        const image = $('div img:nth-of-type(2)').attr('src');
        const imageAltText = $('div img:nth-of-type(2)').attr('alt');

        //extract paragraph content
        function extractParagraphContent(container) {
            const content = {};
            
            // extract header from the <h3> image alt attribute
            const headerImg = $(container).find('h3 img');
            content.header = headerImg.length ? headerImg.attr('alt').trim() : '';
        
            // extract the first paragraph
            content.paragraph = $(container).find('p').first().text().trim();
        
            // extract only first list 
            content.listItems = [];
            const firstList = $(container).find('ul').first();
            firstList.find('li').each((i, elem) => {
                content.listItems.push($(elem).text().trim());
            });
        
            content.fullContent = [
                content.header,
                content.paragraph,
                content.listItems.join(', '),
            ].filter(text => text).join(' ');
        
            return content;
        }
        
        const splitLeftContent = extractParagraphContent('div.splitLeft');
        const splitRightContent = extractParagraphContent('div.splitRight');
        
        const combinedParagraphContent = [
            splitLeftContent.fullContent,
            splitRightContent.fullContent
        ].filter(text => text).join('\n\n');
                
        // extract about us
        const aboutUs = [];
        $('div[class="widget"] ul.cluster li p').each((_index, element) => {
            aboutUs.push($(element).text().trim());
        });

        // extract phone number (health number)
        const phoneNumber = $('p strong:contains("24/7 PHONE SUPPORT") + br + a').first().attr('href').replace('tel:', '');

        //extract extra info
        const extraInfo = $('div.field-item.even p:nth-of-type(2) img').attr('alt');
        const extraInfoList = extraInfo.split('Call').map(item => item.trim()).filter(item => item);

        // check if resource already exists
        let existingResource = await IndResources.findOne({ ResourceURL: url });

        if (existingResource) {
            existingResource.ImageURL = image || "Image not found";
            existingResource.ImageAltText = imageAltText || "Image not found";
            existingResource.Title = title || "Title not found";
            existingResource.BuildingName = aboutUs[0] || "Unknown Building";
            existingResource.ParagraphText = combinedParagraphContent;
            existingResource.PhoneNumber = phoneNumber || "No Phone Number Found";
            existingResource.LastUpdate = new Date();
            existingResource.ListOfHours = aboutUs.slice(2);
            existingResource.ExtraInfo = extraInfoList || "No extra info found";

            await existingResource.save();
            return res.json({ message: "Resource updated successfully", data: existingResource });
        } 

        // create new resource if no existing one
        const newResource = new IndResources({
            _id: genderAffirmingId,
            ImageURL: image || "Image not found",
            ImageAltText: imageAltText || "Image not found",
            Title: title,
            BuildingName: aboutUs[0] || "Unknown Building",
            ParagraphText: paragraphs.join('\n\n'),
            PhoneNumber: phoneNumber || "No Phone Number Found",
            ResourceURL: url,
            LastUpdate: new Date(),
            Category: 'Health Services',
            ListOfHours: aboutUs.slice(2),
            ExtraInfo: extraInfoList || "No extra info found",
        });

        const savedResource = await newResource.save();
        return res.json({ message: "Resource created successfully", data: savedResource });

    } catch (error) {
        console.error('Scraping failed:', error.message);
        res.status(500).send('Error fetching Gender Affirming Care data: ' + error.message);
    }
});

module.exports = router;
