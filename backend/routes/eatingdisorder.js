const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()
const IndResources = require('../models/IndividualResources')

// module.exports = router

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
    return daysMap[day] || day
}

const formatHours = (text) => {
    const daysTimePattern =
        /(\w+)(?: to (\w+))? (\d{1,2}am|\d{1,2}pm) - (\d{1,2}am|\d{1,2}pm)/
    const match = text.match(daysTimePattern)

    if (match) {
        let [_, startDay, endDay, startTime, endTime] = match

       
        startDay = convertToShortDay(startDay)
        endDay = endDay ? convertToShortDay(endDay) : startDay 

        const daysRange =
            startDay === endDay ? startDay : `${startDay}-${endDay}`
        return `${daysRange} ${startTime}-${endTime}`
    }

    return ''
}

// GET route for all individual resources
router.put('/eating-disorder-treatment', async (req, res) => {
    try {
        const response = await axios.get('https://chw.calpoly.edu/counseling/eating-disorder-treatment')
        const $ = cheerio.load(response.data)
        // For now we are going to hardcode the eating-disorder_id
        let eating_disorder_id = '67988afa0813b31428b7e80d'

        // Extract header information
        const title =
            $('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            $('meta[name="title"]').attr('content')
        const url = $('meta[property="og:url"]').attr('content')

        // Extract image information
        const image = $('a[class="Header-branding"]')
            .children('img')
            .attr('src')
        const image_alt = $('a[class="Header-branding"]')
            .children('img')
            .attr('alt')

        // Regex for extracting phone numbers, emails, and days of the week
        const daysRegex =
            /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/

        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g
        // Note: modified so that first character cannot be a number (specific to Cal Fresh)
        const emailRegex =
            /[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

        // Extract footer information
        const widget_info = []
        const list_of_hours = []
        let phoneNum
        let email // extracted but not used (can add)
        $('widgets')
            .find('p')
            .each((_index, element) => {
                const $widget_info_text = $(element).text().trim()
                // If a day of the week is found : (likely for list of hours)
                if (daysRegex.test($widget_info_text)) {
                    const formattedDate = $widget_info_text
                        .split('\n') // Split by newline for multiple ranges
                        .map(formatHours) // Format each part
                        .join(' \n') // Join them back with a newline
                    list_of_hours.push(formattedDate)
                    // Check if phone number or email is found
                } else if (
                    phoneRegex.test($widget_info_text) ||
                    emailRegex.test($widget_info_text)
                ) {
                    phoneNum = $widget_info_text.match(phoneRegex)[0]
                    email = $widget_info_text.match(emailRegex)[0]
                    // Any other footer info we can put extract
                } else {
                    widget_info.push($(element).text().trim())
                }
            })

        // Extract main text information
        const mainText = []
        $('section[class="Index-page"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element).text().trim()
                mainText.push($paragraphText)
            })

        // Extract extra information
        const extraInfo = []
        const applyLink = $('div[id="dropdown-1"]').find('a').attr('href')
        const proof = $('div[id="dropdown-2"]')
            .children('ul')
            .text()
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line !== '') // Remove any empty lines
            .join('\n') // Join the lines back together into a single string
        // const refsheet =
        //     'https://images.squarespace-cdn.com/content/v1/5d23bd3e183a68000117b01d/ce8382f3-1224-4036-9d63-5035c81bf0c4/updated+what+is+calfresh+web.jpg'
        // extraInfo.push(applyLink)
        // extraInfo.push(proof)
        // extraInfo.push(refsheet)

        // Calculate current time
        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            _id: eating_disorder_id,
            ImageURL: image,
            ImageAltText: image_alt,
            Title: title,
            // Address: footer_info[0],
            // ParagraphText: mainText[0],
            // PhoneNumber: phoneNum,
            // ResourceURL: url,
            // LastUpdate: currentTime,
            // Category: 'Food Resources',
            // ListOfHours: list_of_hours,
            // ExtraInfo: extraInfo,
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: eating_disorder_id },
            newResource,
            { new: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Eating Disorder data')
    }
})

// model.express = router
