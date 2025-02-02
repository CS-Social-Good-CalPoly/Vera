const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()
const IndResources = require('../models/IndividualResources')

model.express = router

// Scraping the food pantry resources

router.put('/scrapefoodpantry', async (req, res) => {
    try {
        const webpage = await axios.get(
            'https://basicneeds.calpoly.edu/foodpantry',
        )
        const $ = cheerio.load(webpage.data)
    
        const ImageURL = $('img').attr('src')
        const Title = $('h1.page-title').text().trim() 

        // Getting Location Information from the drop-down menu
        const LocationInformation = $('p.ui-accordion-content[id = "ui-id-2"] span').text()
        const LocationParts = LocationInformation.split('\n').map(line => line.trim())
        const BuildingName = LocationParts[0] 
        const Address = LocationParts[1]
        const PhoneNumber = LocationParts[2]

        // Getting the paragraph text
        const ParagraphText = $('.field-item.even p').first().text().trim()

        const ResourceURL = 'https://basicneeds.calpoly.edu/foodpantry'

        // Store when the scraper last ran
        const currentTime = new Date()
        const LastUpdate = currentTime.toISOString()
        const Category = 'Food Resources'

        const ListOfHours = []
        const AccessingFoodPantry = $('p.ui-accordion-content[id = "ui-id-8"] span').text()
        const FoodSource = $('p.ui-accordion-content[id = "ui-id-11"] span').text()
        

    }
})

//TODO: Add the "||" statements for every single scrape in case it didn't work

const IndResSchema = new Schema({
    _id: Schema.Types.ObjectId,
    ImageURL: String,
    ImageAltText: String,
    Title: String,
    Address: String,
    BuildingName: String,
    ParagraphText: String,
    PhoneNumber: String,
    ResourceURL: String,
    LastUpdate: Date,
    Category: String,
    ExtraInfo: [String],
    ListOfHours: [String],
})

