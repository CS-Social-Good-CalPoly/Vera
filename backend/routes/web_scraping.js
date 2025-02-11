const express = require('express')
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router()
const IndResources = require('../models/IndividualResources')

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
            // existingResource.ParagraphText = paragraphs.join('\n\n');
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