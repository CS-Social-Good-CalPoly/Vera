const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()
const IndResources = require('../models/IndividualResources')

model.express = router

// Copied Joel's convertAToShortDay function
const convertToShortDay = (day) => {
    const daysMap = {
        Monday: 'Mon',
        Tuesday: 'Tue',
        Wednesday: 'Wed',
        Thursday: 'Thu',
        Friday: 'Fri',
        Saturday: 'Sat',
        Sunday: 'Sun',
    }
    return daysMap[day] || day // return the short form or the original if not found
}

const formatListOfHours = (text) => {
    const hoursRegex = /(\w+) through (\w+) from (\d{1,2}):(\d{2})(AM|PM) to (\d{1,2}):(\d{2})(AM|PM)/ // regex pattern for hours
    const matchText = text.match(hoursRegex) // match the text with the pattern

    if (matchText) {
        let [_, startDay, endDay, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod] = matchText // split up matchText into variables
        startDay = convertToShortDay(startDay) // convert days to short form
        endDay = convertToShortDay(endDay) // convert days to short form

        const daysRange = startDay === endDay ? startDay : `${startDay}-${endDay}` // format days

        return `${daysRange} ${startHour}:${startMinute}${startPeriod} - ${endHour}:${endMinute}${endPeriod}` // return formatted hours
    }
    return '' // return empty string if no match
}

// Scraping the food pantry resources
router.put('/scrapefoodpantry', async (req, res) => {
    try {
        const webpage = await axios.get(
            'https://basicneeds.calpoly.edu/foodpantry',
        ) // fetch the webpage
        const $ = cheerio.load(webpage.data) // load the webpage into cheerio
    
        const ImageURL = $('img').attr('src') // Getting the image URL
        const Title = $('h1.page-title').text().trim() // Getting the title
        const Category = 'Food Resources' // Category of the resource
        const ResourceURL = 'https://basicneeds.calpoly.edu/foodpantry' // URL of the resource

        const ParagraphText = $('.field-item.even p').first().text().trim() // Getting the paragraph text
        const AccessingFoodPantry = $('p.ui-accordion-content[id = "ui-id-8"] span').text().trim() // Getting text on how to access resource
        const FoodSource = $('p.ui-accordion-content[id = "ui-id-11"] span').text().trim() // Getting the food source of food pantry


        // Getting Location Information from the drop-down menu
        const LocationInformation = $('p.ui-accordion-content[id = "ui-id-2"] span').text()
        const LocationParts = LocationInformation.split('\n').map(line => line.trim()) // split the text by new line and trim each line
        const BuildingName = LocationParts[0] // Getting the building name
        const Address = LocationParts[1] // Getting the address
        const PhoneNumber = LocationParts[2] // Getting the phone number

        // Store when the scraper last ran
        const currentTime = new Date() // get the current time
        const LastUpdate = currentTime.toISOString() // convert the time to ISO string

        // Getting the list of hours
        const ListOfHours = $('.ui-accordion-content[id = "ui-id-4"]').text().trim() // Getting the paragraph with horus
        const formattedHours = formatListOfHours(ListOfHours) // format the hours and save it
        
        // Create a new resource object for the Food Pantry
        const foodPantryResource = new IndResources({
            ImageURL: ImageURL,
            Title: Title,
            Address: Address,
            BuildingName: BuildingName,
            ParagraphText: ParagraphText,
            PhoneNumber: PhoneNumber,
            ResourceURL: ResourceURL,
            LastUpdate: LastUpdate,
            Category: Category,
            ExtraInfo: [AccessingFoodPantry, FoodSource],
            ListOfHours: [formattedHours],
        })

        res.json(foodPantryResource) // return the resource 

    }  catch (error) {
        console.error('Scraping failed:', error)
        res.status(500).send('Error fetching food pantry data')
    }
})

//TODO: Add the "||" statements for every single scrape in case it didn't work

module.exports = router
