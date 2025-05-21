const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const IndResources = require('../models/IndividualResources')
const router = express.Router()
module.exports = router

/* -------------------- HELPER FUNCTIONS -------------------- */
// Function to convert full days to abbreviated form (eg. Monday -> Mon)
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
// Function to handle extracting days and time ranges (eg. format to Mon-Fri 9am-5pm)
const formatHours = (text) => {
    const daysTimePattern =
        /(\w+)(?: to (\w+))? (\d{1,2}am|\d{1,2}pm) - (\d{1,2}am|\d{1,2}pm)/
    const match = text.match(daysTimePattern)

    if (match) {
        let [_, startDay, endDay, startTime, endTime] = match

        // Convert to abbreviated form
        startDay = convertToShortDay(startDay)
        endDay = endDay ? convertToShortDay(endDay) : startDay // If there's no 'to', it's the same day

        // Handle the case where the range is multiple days
        const daysRange =
            startDay === endDay ? startDay : `${startDay}-${endDay}`
        return `${daysRange} ${startTime}-${endTime}`
    }

    return ''
}

const formatHours1 = (text) => {
    const hoursRegex =
        /(\d{1,2}(:\d{2})?\s?(AM|PM))\s?-\s?(\d{1,2}(:\d{2})?\s?(AM|PM))\s?\|\s?([A-Za-z,-]+)/i

    const dayMapping = {
        M: 'Mon',
        T: 'Tue',
        W: 'Wed',
        Th: 'Thu',
        F: 'Fri',
        S: 'Sat',
        Su: 'Sun',
    }

    const match = text.match(hoursRegex)
    if (!match) return text // Return original if no match is found

    let startTime = match[1].replace(/\s/g, '').toLowerCase() // Remove spaces, convert to lowercase
    let endTime = match[4].replace(/\s/g, '').toLowerCase()
    let days = match[7]

    // Convert days to full names
    days = days.replace(/M|T|W|Th|F|S|Su/g, (m) => dayMapping[m] || m)

    return `${days} ${startTime}-${endTime}`
}

const formatHoursFoodPantry = (text) => {
    const hoursRegex =
        /.*\s+(\w+)\s+through\s+(\w+)\s+from\s+(\d{1,2}):(\d{2})(AM|PM)\s+to\s+(\d{1,2}):(\d{2})(AM|PM).*/ // regex pattern for hours
    const matchText = text.match(hoursRegex) // match the text with the pattern

    if (matchText) {
        let [
            _,
            startDay,
            endDay,
            startHour,
            startMinute,
            startPeriod,
            endHour,
            endMinute,
            endPeriod,
        ] = matchText // split up matchText into variables
        startDay = convertToShortDay(startDay) // convert days to short form
        endDay = convertToShortDay(endDay) // convert days to short form

        const daysRange =
            startDay === endDay ? startDay : `${startDay}-${endDay}` // format days

        return `${daysRange} ${startHour}:${startMinute}${startPeriod} - ${endHour}:${endMinute}${endPeriod}` // return formatted hours
    }
    return 'Not found' // return empty string if no match
}

/* -------------------- COVID-19 -------------------- */
router.put('/scrape-covid19-resource', async (req, res) => {
    try {
        const url = 'https://chw.calpoly.edu/health/Covid-19'
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        // Extract Title
        const Title = $('h1.page-title').text().trim()

        // Extract Image URL
        let ImageURL = $('div.field-item.even img').attr('src') || ''
        let ImageAltText = $('div.field-item.even img').attr('alt').trim() || ''

        // Extracting the building name under "Location" h3
        const BuildingName = $('h3:contains("Location")')
            .next('p')
            .find('a')
            .text()
            .trim()

        // Extract Paragraph
        const ParagraphText = $('div.clear').first().text().trim()

        // Extract Phone Number
        const PhoneNumber = $('a[href^="tel"]').first().text().trim()

        // Extract List of Hours
        const ListOfHours = []
        $('p:contains("Hours")').each((i, elem) => {
            const text = $(elem)
                .text()
                .replace('Hours', '')
                .trim()
                .split('Building')[0]
            if (text) ListOfHours.push(text)
        })

        // Extract extra info as an array of objects { text, url }
        const ExtraInfo = []
        $('h2:has(img[alt="Covid 19 testing resources"])')
            .next('ul')
            .find('li')
            .each((index, element) => {
                const fullText = $(element).text().trim() // Extract only text
                ExtraInfo.push(fullText) // Push only the text, no links
            })

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
                ResourceURL: url,
            },
            { new: true, upsert: true }, // Create if doesn't exist, update if it does
        )

        res.status(200).json({
            message: 'Scraped data successfully stored in MongoDB',
            data: updatedCovidResource,
        })
    } catch (error) {
        console.error('Scraping error:', error)
        res.status(500).json({
            error: 'An error occurred while scraping the resource.',
        })
    }
})

/* -------------------- PHARMACY -------------------- */
// PUT route for Pharmacy
router.put('/pharmacy', async (req, res) => {
    try {
        const response = await axios.get(
            'https://chw.calpoly.edu/health/pharmacy',
        )
        const $ = cheerio.load(response.data)
        // For now we are going to hardcode the cal_fresh_id
        let pharmacy_id = '60a5a5661d9811d718c3d998'

        // Extract header information
        // Specifically for this site, take the first part of title since it's repetittive
        const title =
            $('meta[property="og:title"]')
                .attr('content')
                .split('|')[0]
                .trim() ||
            $('title').text().trim() ||
            $('meta[name="title"]').attr('content')
        const url = $('meta[property="og:url"]').attr('content')

        // Extract image information
        const image = $('h2[id="header-1"]').children('img').attr('src')
        const image_alt =
            $('h2[id="header-1"]').children('img').attr('alt') ||
            'Pharmacy Image' // Hardcode alt text since banner has none

        // Regex for extracting phone numbers, emails, and days of the week
        const daysRegex =
            /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/

        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g
        // Note: modified so that first character cannot be a number (specific to Cal Fresh)
        const emailRegex =
            /[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

        // Regex for extracting building
        const buildingRegex = /(Building\b) (\w+)/
        // Regex for extracting hours
        const hoursRegex =
            /(\d{1,2}(:\d{2})?\s?(AM|PM))\s?-\s?(\d{1,2}(:\d{2})?\s?(AM|PM))\s?\|\s?([A-Za-z,-]+)/i

        // Extract info bar information
        let phoneNum = ''
        let email = ''
        let column_info = []
        let list_of_hours = []
        let location = ''

        $('div[id="rightCol"]')
            .children('div[id="block-block-19"]')
            .children('p')
            .each((_index, element) => {
                let $column_info_text = $(element).text().trim()
                if (buildingRegex.test($column_info_text)) {
                    location = $column_info_text.match(buildingRegex)[0]
                    // We know the rest of the information is hours info
                    // extract this and put into the list_of_hours array
                    $column_info_text = $column_info_text
                        .replace(location, '')
                        .trim()
                    const formattedDate = formatHours1(
                        $column_info_text.match(hoursRegex)[0],
                    )

                    list_of_hours.push(formattedDate)
                } else if (daysRegex.test($column_info_text)) {
                    // If a day of the week is found : (likely for list of hours)
                    const formattedDate = $column_info_text
                        .split('\n') // Split by newline for multiple ranges
                        .map(formatHours) // Format each part
                        .join(' \n') // Join them back with a newline
                    list_of_hours.push(formattedDate)
                    // Check if phone number or email is found
                } else if (
                    phoneRegex.test($column_info_text) ||
                    emailRegex.test($column_info_text)
                ) {
                    phoneNum = $column_info_text.match(phoneRegex)[0]
                    email = $column_info_text.match(emailRegex)[0]
                    // Any other footer info we can put extract
                } else {
                    column_info.push($(element).text().trim())
                }
            })

        // Extract main text information
        const mainText = []
        const extraInfo = []

        $('div[class="field-item even"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element)
                // Finds the paragraph that starts with the respective title
                if (
                    $paragraphText.find('strong') &&
                    $paragraphText.find('strong').text().trim() ==
                        'For students, faculty, and staff:'
                ) {
                    // This is the paragraphText
                    mainText.push($paragraphText.text().trim())
                } else if (
                    $paragraphText.find('strong') &&
                    $paragraphText.find('strong').text().trim() ==
                        'Transferring your prescription to the Cal Poly Pharmacy:'
                ) {
                    // Since the infomation is split into two paragraphs, we need to combine them
                    const $nextElem = $paragraphText.next()
                    const combinedText =
                        $paragraphText.text().trim() +
                        ' ' +
                        $nextElem.text().trim()
                    extraInfo.push(combinedText)
                }
            })
        // Hard coded extra info
        extraInfo.push(
            "For more information on specific items to purchase, visit the Cal Poly Health Center's website",
        )

        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            // _id: cal_fresh_id,
            Title: title,
            ImageURL: image,
            ImageAltText: image_alt,
            Address: location,
            BuildingName: location,
            ParagraphText: mainText[0],
            PhoneNumber: phoneNum,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Health Services',
            ListOfHours: list_of_hours,
            ExtraInfo: extraInfo,
            WhatToExpect: '', // legacy field
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: pharmacy_id },
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
        res.status(500).send('Error fetching Pharmacy data')
    }
})

/* -------------------- GENDER AFFIRMING CARE -------------------- */
router.put('/gender-affirming-care', async (req, res) => {
    const url = 'https://chw.calpoly.edu/gender-affirming-care'

    try {
        let genderAffirmingId = '67a181d68f5dcda530f9ead7'

        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        // extract title,image, image alt
        const title = $('h1.page-title').text().trim()
        const image = $('div img:nth-of-type(2)').attr('src')
        const imageAltText = $('div img:nth-of-type(2)').attr('alt')

        //extract paragraph content
        function extractParagraphContent(container) {
            const content = {}

            // extract header from the <h3> image alt attribute
            const headerImg = $(container).find('h3 img')
            content.header = headerImg.length
                ? headerImg.attr('alt').trim()
                : ''

            // extract the first paragraph
            content.paragraph = $(container).find('p').first().text().trim()

            // extract only first list
            content.listItems = []
            const firstList = $(container).find('ul').first()
            firstList.find('li').each((i, elem) => {
                content.listItems.push($(elem).text().trim())
            })

            content.fullContent = [
                content.header,
                content.paragraph,
                content.listItems.join(', '),
            ]
                .filter((text) => text)
                .join(' ')

            return content
        }

        const splitLeftContent = extractParagraphContent('div.splitLeft')
        const splitRightContent = extractParagraphContent('div.splitRight')

        const combinedParagraphContent = [
            splitLeftContent.fullContent,
            splitRightContent.fullContent,
        ]
            .filter((text) => text)
            .join('\n\n')

        // extract about us
        const aboutUs = []
        $('div[class="widget"] ul.cluster li p').each((_index, element) => {
            aboutUs.push($(element).text().trim())
        })

        // extract phone number (health number)
        const phoneNumber = $(
            'p strong:contains("24/7 PHONE SUPPORT") + br + a',
        )
            .first()
            .attr('href')
            .replace('tel:', '')

        //extract extra info
        const extraInfo = $('div.field-item.even p:nth-of-type(2) img').attr(
            'alt',
        )
        const extraInfoList = extraInfo
            .split('Call')
            .map((item) => item.trim())
            .filter((item) => item)

        // check if resource already exists
        let existingResource = await IndResources.findOne({ ResourceURL: url })

        if (existingResource) {
            existingResource.ImageURL = image || 'Image not found'
            existingResource.ImageAltText = imageAltText || 'Image not found'
            existingResource.Title = title || 'Title not found'
            existingResource.BuildingName = aboutUs[0] || 'Unknown Building'
            existingResource.ParagraphText = combinedParagraphContent
            existingResource.PhoneNumber =
                phoneNumber || 'No Phone Number Found'
            existingResource.LastUpdate = new Date()
            existingResource.ListOfHours = aboutUs.slice(2)
            existingResource.ExtraInfo = extraInfoList || 'No extra info found'

            await existingResource.save()
            return res.json({
                message: 'Resource updated successfully',
                data: existingResource,
            })
        }

        // create new resource if no existing one
        const newResource = new IndResources({
            _id: genderAffirmingId,
            ImageURL: image || 'Image not found',
            ImageAltText: imageAltText || 'Image not found',
            Title: title,
            BuildingName: aboutUs[0] || 'Unknown Building',
            ParagraphText: paragraphs.join('\n\n'),
            PhoneNumber: phoneNumber || 'No Phone Number Found',
            ResourceURL: url,
            LastUpdate: new Date(),
            Category: 'Health Services',
            ListOfHours: aboutUs.slice(2),
            ExtraInfo: extraInfoList || 'No extra info found',
        })

        const savedResource = await newResource.save()
        return res.json({
            message: 'Resource created successfully',
            data: savedResource,
        })
    } catch (error) {
        console.error('Scraping failed:', error.message)
        res.status(500).send(
            'Error fetching Gender Affirming Care data: ' + error.message,
        )
    }
})

/* -------------------- CAL FRESH RESOURCES -------------------- */
// GET route for all individual resources
router.put('/cal_fresh', async (req, res) => {
    try {
        const response = await axios.get('https://www.calfreshcalpoly.org/')
        const $ = cheerio.load(response.data)
        // For now we are going to hardcode the cal_fresh_id
        let cal_fresh_id = '67988afa0813b31428b7e80d'

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
        const footer_info = []
        const list_of_hours = []
        let phoneNum
        let email // extracted but not used (can add)
        $('footer')
            .find('p')
            .each((_index, element) => {
                const $footer_info_text = $(element).text().trim()
                // If a day of the week is found : (likely for list of hours)
                if (daysRegex.test($footer_info_text)) {
                    const formattedDate = $footer_info_text
                        .split('\n') // Split by newline for multiple ranges
                        .map(formatHours) // Format each part
                        .join(' \n') // Join them back with a newline
                    list_of_hours.push(formattedDate)
                    // Check if phone number or email is found
                } else if (
                    phoneRegex.test($footer_info_text) ||
                    emailRegex.test($footer_info_text)
                ) {
                    phoneNum = $footer_info_text.match(phoneRegex)[0]
                    email = $footer_info_text.match(emailRegex)[0]
                    // Any other footer info we can put extract
                } else {
                    footer_info.push($(element).text().trim())
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
        const refsheet =
            'https://images.squarespace-cdn.com/content/v1/5d23bd3e183a68000117b01d/ce8382f3-1224-4036-9d63-5035c81bf0c4/updated+what+is+calfresh+web.jpg'
        extraInfo.push(applyLink)
        extraInfo.push(proof)
        extraInfo.push(refsheet)

        // Calculate current time
        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            _id: cal_fresh_id,
            ImageURL: image,
            ImageAltText: image_alt,
            Title: title,
            Address: footer_info[0],
            ParagraphText: mainText[0],
            PhoneNumber: phoneNum,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Food Resources',
            ListOfHours: list_of_hours,
            ExtraInfo: extraInfo,
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: cal_fresh_id },
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
        res.status(500).send('Error fetching Cal Fresh data')
    }
})

/* -------------------- SEXUAL REPRODUCTIVE HEALTH -------------------- */
router.put('/sexual-reproductive-health', async (req, res) => {
    try {
        // taken from the database once the record was added to the collection already
        let health_id = '67a0515f5ad4b6e0938cd2d5'

        // fetch HTML and extract data
        const response = await axios.get(
            'https://chw.calpoly.edu/health/sexual-reproductive-health-services',
        )
        const $ = cheerio.load(response.data)

        // extract header information
        const title = (
            $('meta[property="og:title"]').attr('content') ||
            $('title').text() ||
            $('meta[name="title"]').attr('content')
        ).substring(1)
        const url = $('meta[property="og:url"]').attr('content')

        // extract image information
        const image = $('p[id="subH1"]').children('img').attr('src')
        const image_alt = $('p[id="subH1"]').children('img').attr('alt')

        // extract paragraph text
        const paragraphs = []
        $('div[class="field-item even"]')
            .children('p')
            .each((i, elem) => {
                const $text = $(elem).text().trim()
                if ($text.length > 0) {
                    paragraphs.push($text)
                }
            })

        // extract extra info (headers)
        const extraInfo = []
        $('div[class="field-item even"]')
            .children('ul')
            .children('li')
            .each((i, elem) => {
                extraInfo.push($(elem).text())
            })

        // extract info from About Us widget
        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g

        const aboutUs = []
        $('div[class="widget"]')
            .children('ul[class="cluster"]')
            .find('li')
            .each((_index, element) => {
                const $text = $(element).children('p').text().trim()
                const match = $text.match(phoneRegex)
                aboutUs.push(match ? match[0] : $text)
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

/* -------------------- EMOTIONAL WELLBEING -------------------- */
router.put('/emotional-wellbeing', async (req, res) => {
    try {
        const url =
            'https://chw.calpoly.edu/counseling/emotional-wellbeing-workshops'
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        // Extract Title
        const Title = $('h1.page-title').text().trim()

        // Extract Image URL
        let ImageURL = $('div.field-item.even img').attr('src') || ''
        let ImageAltText =
            $('div.field-item.even img').attr('alt').trim() ||
            'Emotional Wellbeing Page Header'

        // Extracting the building name under "Location" h3
        const BuildingName = $('h3:contains("Location")')
            .next('p')
            .find('a')
            .text()
            .trim()

        // Extract Paragraph
        const ParagraphText = $('.field-item[property="content:encoded"] p')
            .eq(1)
            .text()
            .trim()

        // Extract Phone Number
        const PhoneNumber = $('p a[href^="tel:"]').first().text().trim()

        // Extract List of Hours
        const ListOfHours = []
        const hoursText = $('h3:contains("Hours")').next('p').text().trim()
        ListOfHours.push(hoursText)

        const paragraphs = $('.field-item[property="content:encoded"] p')
        // Getting the extra info fields dynamically as each pargraph contain a different structure
        const anxietyToolboxParagraph = paragraphs.eq(5).text().trim()
        const rioParagraph = paragraphs.eq(6).text().trim()
        const gettingUnstuckParagraph = paragraphs.eq(9).text().trim()
        const bridgeParagraph = paragraphs.eq(10).text().trim()

        // Push pargraphs to a list
        const ExtraInfo = []
        ExtraInfo.push(anxietyToolboxParagraph)
        ExtraInfo.push(rioParagraph)
        ExtraInfo.push(gettingUnstuckParagraph)
        ExtraInfo.push(bridgeParagraph)

        // Upsert into MongoDB
        const updatedEmotionalWellbeingResource =
            await IndResources.findOneAndUpdate(
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
                    ResourceURL: url,
                    Category: 'Counseling and Psychological Services',
                },
                { new: true, upsert: true }, // Create if doesn't exist, update if it does
            )

        res.status(200).json({
            message: 'Scraped data successfully stored in MongoDB',
            data: updatedEmotionalWellbeingResource,
        })
    } catch (error) {
        console.error('Scraping error:', error)
        res.status(500).json({
            error: 'An error occurred while scraping the resource.',
        })
    }
})

/* ------------------------- FOOD PANTRY ------------------------- */
router.put('/scrapefoodpantry', async (req, res) => {
    try {
        const webpage = await axios.get(
            'https://basicneeds.calpoly.edu/foodpantry',
        ) // fetch the webpage
        const $ = cheerio.load(webpage.data) // load the static webpage into cheerio

        const ImageURL = $('#header-1 a img').attr('src') // Getting the image URL located in header-1 -> a -> img
        const ImageAltText = 'Cal Poly Food Pantry' // Alt text for the image
        const Title = $('h1.page-title').text().trim() // Getting the title located in the page-title class
        const Category = 'Food Resources' // Category of the resource is food resources
        const ResourceURL = 'https://basicneeds.calpoly.edu/foodpantry' // URL of the resource

        const ParagraphText = $('.field-item.even p').first().text().trim() // Getting the paragraph text located in the div and uses the classes field-item and even
        const AccessingFoodPantry = $('#Accessing_the_Cal_Poly_Food_Pantry')
            .parent()
            .next()
            .text()
            .trim() // Getting the text for accessing the food pantry by looking at the id and getting the next sibling
        const FoodSource = $('#Where_does_the_food_come_from')
            .parent()
            .next()
            .text()
            .trim() // Getting the text for the food source by looking at the id and getting the next sibling

        // Getting Location Information from the drop-down menu
        const LocationInformation = $('#Location')
            .parent()
            .next()
            .find('span')
            .html()
            .trim() // Getting the location information by looking at the id and getting the next sibling
        const LocationParts = LocationInformation.split('<br>').map((line) =>
            line.trim(),
        ) // split the text by new line and trim each line
        const BuildingName = LocationParts[0].replace('&amp;', '&') // Getting the building name and replace &amp; with &
        const Address = LocationParts[1].split('&nbsp')[0] // Getting the address and split by &nbsp and get the first part
        let PhoneNumber = LocationParts[2].split('&nbsp')[0] // Getting the phone number and split by &nbsp and get the first part
        PhoneNumber = PhoneNumber.replace('Phone:', '') // remove all non-digit characters from the phone number

        // Store when the scraper last ran
        const currentTime = new Date() // get the current time
        const LastUpdate = currentTime.toISOString() // convert the time to ISO string

        // Getting the list of hours
        let ListOfHours = $('#Hours_for_Cal_Poly_Students')
            .parent()
            .next()
            .text()
            .trim() // Getting the list of hours by looking at the id and getting the next sibling
        ListOfHours = ListOfHours.split('.')[0] // split the text by '.' and get the first part

        const FormattedHours = formatHoursFoodPantry(ListOfHours) // format the hours using the formatHoursFoodPantry function

        // Create a new resource object for the Food Pantry
        const foodPantryResource = new IndResources({
            _id: '60a5a5661d9811d718c3d998', // id of the food pantry resource in MongoDB
            Title: Title,
            ImageURL: ImageURL,
            ImageAltText: ImageAltText,
            Address: Address,
            BuildingName: BuildingName,
            ParagraphText: ParagraphText,
            PhoneNumber: PhoneNumber,
            ResourceURL: ResourceURL,
            LastUpdate: LastUpdate,
            WhatToExpect: '',
            Category: Category,
            ExtraInfo: [AccessingFoodPantry, FoodSource],
            ListOfHours: [FormattedHours],
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            // save the resource to the database using the id
            { _id: '60a5a5661d9811d718c3d998' }, // id of the food pantry resource in MongoDB
            foodPantryResource, // resource object to save
            { new: true },
        )

        res.json(foodPantryResource) // return the resource
    } catch (error) {
        // return an error if the scraper fails
        console.error('Scraping failed:', error)
        res.status(500).send('Error fetching food pantry data')
    }
})

/* ----------------------- Welltrack Boost ----------------------- */
router.put('/welltrack-boost', async (req, res) => {
    try {
        // Step 1: Fetch the HTML
        const url = 'https://chw.calpoly.edu/counseling/apps'
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        // Step 2: Extracting Data with Cheerio
        const title = 'Welltrack Boost App' // Unfortunatly, the title is an image

        let imageURL =
            $('div.field-item.even p:first-child img:eq(1)').attr('src') || ''
        let imageAltText =
            $('div.field-item.even p:first-child img:eq(1)')
                .attr('alt')
                .trim() || 'Welltrack Boost Logo'

        // Extracting the first two paragraphs
        // We are using :gt(0) to skip the first paragraph and :lt(2) to get the next two paragraphs
        const paragraphTexts = []
        $('div.field-item.even p:gt(0):lt(2)').each((index, element) => {
            const text = $(element).text().trim()
            paragraphTexts.push(text)
        })
        const paragraphText = paragraphTexts.join('\n')

        let resourceUrl = $('div.field-item.even p:eq(3) a').attr('href') || ''

        // Current timestamp
        const currentTime = new Date()

        // Step 3: Save or update data in MongoDB
        const resourceData = {
            Title: title,
            ImageURL: imageURL,
            ImageAltText: imageAltText,
            BuildingName: '',
            ParagraphText: paragraphText,
            PhoneNumber: '',
            ListOfHours: [],
            ExtraInfo: '',
            ResourceURL: resourceUrl,
            LastUpdate: currentTime,
            Category: 'Self-Help',
        }

        const updatedResource = await IndResources.findOneAndUpdate(
            { ResourceURL: url }, // unique field for updating
            resourceData,
            { new: true, upsert: true }, // create or update
        )

        // Send success response
        res.status(200).json({
            message: 'Scraped data successfully stored in MongoDB',
            data: updatedResource,
        })
    } catch (error) {
        console.error('Scraping error:', error)
        res.status(500).json({
            error: 'An error occurred while scraping the resource.',
        })
    }
})

/* -------------------- SUICIDE PREVENTION -------------------- */
router.put('/suicide-prevention', async (req, res) => {
    try {
        const response = await axios.get(
            'https://chw.calpoly.edu/counseling/suicide-prevention',
        )
        const $ = cheerio.load(response.data)
        // For now we are going to hardcode the suicide_prevention_id
        let suicide_prevention_id = '6804992335e3fe0a7c60b7c6'

        // Extract header information
        // Specifically for this site, take the first part of title since it's repetittive
        const title =
            $('meta[property="og:title"]')
                .attr('content')
                .split('|')[0]
                .trim()
                .substring(1) ||
            $('title').text().trim() ||
            $('meta[name="title"]').attr('content')
        const url = $('meta[property="og:url"]').attr('content')

        // Extract image information
        const image = $('h2[id="If_You_Are_Having_Thoughts_of_Suicide"]')
            .children('img')
            .attr('src')
        const image_alt =
            $('h2[id="If_You_Are_Having_Thoughts_of_Suicide"]')
                .children('img')
                .attr('alt') || 'Suicide Prevention Image' // Hardcode alt text since banner has none

        // Regex for extracting phone numbers, emails, and days of the week
        const daysRegex =
            /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/

        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g
        // Note: modified so that first character cannot be a number (specific to Cal Fresh)
        const emailRegex =
            /[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

        // Regex for extracting building
        const buildingRegex = /(Building\b) (\w+)/
        // Regex for extracting hours
        const hoursRegex =
            /(\d{1,2}(:\d{2})?\s?(AM|PM))\s?-\s?(\d{1,2}(:\d{2})?\s?(AM|PM))\s?\|\s?([A-Za-z,-]+)/i

        // Extract info bar information
        let column_info = []
        let phoneNum = ''
        let email = ''
        let list_of_hours = []
        let location = ''

        $('div[id="rightCol"]')
            .children('div[id="block-block-13"]')
            .children('p')
            .each((_index, element) => {
                let $column_info_text = $(element).text().trim()
                if (buildingRegex.test($column_info_text)) {
                    location = $column_info_text.match(buildingRegex)[0]
                    // We know the rest of the information is hours info
                    // extract this and put into the list_of_hours array
                    $column_info_text = $column_info_text
                        .replace(location, '')
                        .trim()
                    const formattedDate = formatHours1(
                        $column_info_text.match(hoursRegex)[0],
                    )

                    list_of_hours.push(formattedDate)
                } else if (daysRegex.test($column_info_text)) {
                    // If a day of the week is found : (likely for list of hours)
                    const formattedDate = $column_info_text
                        .split('\n') // Split by newline for multiple ranges
                        .map(formatHours) // Format each part
                        .join(' \n') // Join them back with a newline
                    list_of_hours.push(formattedDate)
                }
                if (
                    phoneRegex.test($column_info_text) ||
                    emailRegex.test($column_info_text)
                ) {
                    // Check if phone number or email is found
                    phoneNum = $column_info_text.match(phoneRegex)[0]
                    email = $column_info_text.match(emailRegex)[0]
                } else {
                    // Any other footer info we can put extract
                    column_info.push($(element).text().trim())
                }
            })

        // Extract main text information
        const mainText = []
        const extraInfo = []

        $('div[class="field-item even"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element)
                // Finds the paragraph that starts with the respective title
                if (
                    $paragraphText.find('strong') &&
                    $paragraphText
                        .find('strong')
                        .text()
                        .trim()
                        .startsWith('Contact someone who can help NOW. Call ')
                ) {
                    // This is the paragraphText
                    mainText.push('If You Are Having Thoughts of Suicide ')
                    mainText.push($paragraphText.text().trim())
                } else if (
                    $paragraphText
                        .text()
                        .trim()
                        .startsWith('Students often face challenges')
                ) {
                    mainText.push($paragraphText.text().trim())
                }
                // Conditions for finding ExtraInfo text
                else if (
                    // hard-code the section header
                    $paragraphText.find('img') &&
                    $paragraphText.find('img').attr('src') ==
                        'https://content-calpoly-edu.s3.amazonaws.com/chw/1/images/7_1.png'
                ) {
                    const $ul = $paragraphText.next('ul')
                    $ul.find('li').each((_i, li) => {
                        extraInfo.push($(li).text().trim())
                    })
                } else if (
                    // hard-code the section header
                    $paragraphText.find('img') &&
                    $paragraphText.find('img').attr('src') ==
                        'https://content-calpoly-edu.s3.amazonaws.com/chw/1/images/7_2.png'
                ) {
                    const $nextP = $paragraphText.nextAll('p')
                    $nextP.each((_i, p) => {
                        const $nextA = $(p).find('a').first()
                        const text = $nextA.text().trim()

                        // Filter out empty links or phone numbers
                        if (text) {
                            extraInfo.push(text)
                        }
                    })
                }
            })

        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            _id: suicide_prevention_id,
            Title: title,
            ImageURL: image,
            ImageAltText: image_alt,
            Address: location,
            BuildingName: location,
            ParagraphText: mainText.join('\n'),
            PhoneNumber: phoneNum,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Self-Help',
            ListOfHours: list_of_hours,
            ExtraInfo: extraInfo,
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: suicide_prevention_id },
            newResource,
            { new: true, upsert: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Suicide Prevention data')
    }
})

/* -------------------- EATING DISORDER AND TREATMENT -------------------- */
router.put('/eating-disorder-treatment', async (req, res) => {
    try {
        const response = await axios.get(
            'https://chw.calpoly.edu/counseling/eating-disorder-treatment',
        )
        const $ = cheerio.load(response.data)
        const eating_disorder_id = '680dc31e35e3fe0a7c60f2a1'

        // Extract header information
        const title =
            $('meta[property="og:title"]')
                .attr('content')
                .split('|')[0]
                .trim()
                .substring(1) ||
            $('title').text().trim() ||
            $('meta[name="title"]').attr('content')
        const url = $('meta[property="og:url"]').attr('content')

        // // Extract image information
        const image = $('div[class="field-item even"]')
            .children('p')
            .children('img')
            .attr('src')
        const image_alt =
            $('h2[id="header-1"]').children('img').attr('alt') ||
            'Treatment Image' // Hardcode alt text since banner has none

        // Regex for extracting phone numbers, emails, and days of the week
        const daysRegex =
            /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/

        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g
        // Note: modified so that first character cannot be a number (specific to Cal Fresh)
        const emailRegex =
            /[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

        // Regex for extracting building
        const buildingRegex = /(Building\b) (\w+)/
        // Regex for extracting hours
        const hoursRegex =
            /(\d{1,2}(:\d{2})?\s?(AM|PM))\s?-\s?(\d{1,2}(:\d{2})?\s?(AM|PM))\s?\|\s?([A-Za-z,-]+)/i

        // Extract info bar information
        let phoneNum = ''
        let email = ''
        let column_info = []
        let list_of_hours = []
        let location = ''

        $('div[id="rightCol"]')
            .children('div[id="block-block-13"]')
            .children('p')
            .each((_index, element) => {
                let $column_info_text = $(element).text().trim()
                if (buildingRegex.test($column_info_text)) {
                    location = $column_info_text.match(buildingRegex)[0]
                    // We know the rest of the information is hours info
                    // extract this and put into the list_of_hours array
                    $column_info_text = $column_info_text
                        .replace(location, '')
                        .trim()
                    const formattedDate = formatHours1(
                        $column_info_text.match(hoursRegex)[0],
                    )

                    list_of_hours.push(formattedDate)
                } else if (daysRegex.test($column_info_text)) {
                    // If a day of the week is found : (likely for list of hours)
                    const formattedDate = $column_info_text
                        .split('\n') // Split by newline for multiple ranges
                        .map(formatHours) // Format each part
                        .join(' \n') // Join them back with a newline
                    list_of_hours.push(formattedDate)
                }
                if (
                    phoneRegex.test($column_info_text) ||
                    emailRegex.test($column_info_text)
                ) {
                    // Check if phone number or email is found
                    phoneNum = $column_info_text.match(phoneRegex)[0]
                    email = $column_info_text.match(emailRegex)[0]
                } else {
                    // Any other footer info we can put extract
                    column_info.push($(element).text().trim())
                }
            })

        // Extract main text information
        const mainText = []
        const extraInfo = []

        // Sections for ExtraInfo are headed with an image. Use this for
        // finding the start of each section
        const sectionImageHeadings = new Set([
            'https://content-calpoly-edu.s3.amazonaws.com/chw/1/images/nutrition_1.png',
            'https://content-calpoly-edu.s3.amazonaws.com/chw/1/images/Counseling.png',
            'https://content-calpoly-edu.s3.amazonaws.com/chw/1/images/medical.png',
        ])

        $('div[class="field-item even"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element)
                // Finds the paragraph that starts with the respective title
                if (
                    $paragraphText.find('img') &&
                    $paragraphText
                        .text()
                        .trim()
                        .startsWith('Campus Health & Wellbeing')
                ) {
                    // This is the paragraphText
                    mainText.push($paragraphText.text().trim())
                } else if (
                    // Check if image src is in set of hard-coded section headers
                    $paragraphText.find('img') &&
                    $paragraphText.find('img').attr('src') ==
                        'https://content-calpoly-edu.s3.amazonaws.com/chw/1/images/nutrition_1.png'
                ) {
                    const $nextElem = $paragraphText.next()
                    extraInfo.push($nextElem.text().trim())
                } else if (
                    $paragraphText.find('img') &&
                    sectionImageHeadings.has(
                        $paragraphText.find('img').attr('src'),
                    )
                ) {
                    const $nextElem = $paragraphText.next()
                    extraInfo.push($nextElem.text().trim())
                }
            })

        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            _id: eating_disorder_id,
            Title: title,
            ImageURL: image,
            ImageAltText: image_alt,
            Address: location,
            BuildingName: location,
            ParagraphText: mainText.join('\n'),
            PhoneNumber: phoneNum,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Counseling-and-Psychological-Services',
            ListOfHours: list_of_hours,
            ExtraInfo: extraInfo,
            Tags: [],
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: eating_disorder_id },
            newResource,
            { new: true, upsert: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Eating Disorder Treatment data')
    }
})

/* ----------------------- CARES GRANT ----------------------- */
router.put('/cares-grant', async (req, res) => {
    try {
        // Step 1: Fetch the HTML
        const url = 'https://basicneeds.calpoly.edu/calpolycares'
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        // Step 2: Extracting Data with Cheerio
        const title = $('h1.page-title').text().trim()

        const image = $('div[class="field-item even"]')
            .children('h1[id="header-1"]')
            .children('img')
            .attr('src')

        const imageAlt =
            $('div[class="field-item even"]')
                .children('h1[id="header-1"]')
                .children('img')
                .attr('alt') || 'Cal Poly Students Image'

        // Extracting the main paragraph without the link
        const paragraphText = $('div.field-item.even p span span')
            .first()
            .text()
            .trim()

        const extraInfo = []

        // We also want the "types of expenses covered" information
        $('div.field-item.even div.accordion').each((index, element) => {
            const text = $(element)
                .text()
                .trim()
                .replace(/\n{2,}/g, '\n')
            if (text) {
                extraInfo.push(text)
            }
        })

        // Finally we want the email contact information
        const contact = extraInfo.slice(-1)[0] // Get the last element

        // Extracting the phone number from the contact information
        const phoneNumberMatch = contact.match(/\(\d{3}\)\s?\d{3}-\d{4}/)
        const phoneNumber = phoneNumberMatch ? phoneNumberMatch[0] : ''

        // Current timestamp
        const currentTime = new Date()

        // Step 3: Save or update data in MongoDB
        const resourceData = {
            Title: title,
            ImageURL: image,
            ImageAltText: imageAlt,
            BuildingName: '',
            ParagraphText: paragraphText,
            PhoneNumber: phoneNumber,
            ListOfHours: [],
            ExtraInfo: extraInfo,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Financial Resources and Education',
            Tags: ['Finance', 'Money', 'Grant'],
        }

        const updatedResource = await IndResources.findOneAndUpdate(
            { ResourceURL: url }, // unique field for updating
            resourceData,
            { new: true, upsert: true }, // create or update
        )

        // Send success response
        res.status(200).json({
            message: 'Scraped data successfully stored in MongoDB',
            data: updatedResource,
        })
    } catch (error) {
        console.error('Scraping error:', error)
        res.status(500).json({
            error: 'An error occurred while scraping the resource.',
        })
    }
})

/* -------------------- Let's Talk -------------------- */
router.put('/lets-talk', async (req, res) => {
    try {
        const response = await axios.get(
            'https://chw.calpoly.edu/counseling/lets-talk',
        )
        const $ = cheerio.load(response.data)

        const lets_talk_id = '67b38f4ccd6ae1f04cf826d7'

        const title = "Let's Talk" // The title of the page is an image

        const url = $('meta[property="og:url"]').attr('content')

        const image = $('div[class="field-item even"]')
            .children('p')
            .children('img')
            .attr('src')

        const imageAlt = $('div[class="field-item even"]')
            .children('p')
            .children('img')
            .attr('alt')
            .trim()

        let paragraphText = ''
        const extraInfo = []

        // Iterate through the div to get data for paragraph text, extra info, hours, and zoom meeting link
        $('div[class="field-item even"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element)
                // Finds the paragraph that starts with the respective title

                if (
                    $paragraphText
                        .text()
                        .trim()
                        .startsWith('A free, confidential, one-on-one')
                ) {
                    // This is the main paragraph text
                    paragraphText = $paragraphText.text().trim()
                } else if (
                    $paragraphText
                        .text()
                        .trim()
                        .startsWith(
                            'If you have any questions about Let’s Talk',
                        )
                ) {
                    // This is the extra info
                    extraInfo.push($paragraphText.text().trim())
                }
            })

        // For now there's no way to display the table on the page
        extraInfo.push(
            'To find out about which providers are available on each day, click the link below.',
        )

        const $hours_and_zoom = $('div[class="field-item even"]')
            .find('h2[id="Lets_Talk"]')
            .next('p')

        // Extract the meeting link
        const meetingLink = $hours_and_zoom.find('a').attr('href')

        // Extract the full string containing days, hours, and the Zoom link
        const fullText = $hours_and_zoom.text().trim()

        // Slice the string up to "PM"
        const hoursText = fullText.split('via')[0].trim().replace(',', '') // This will extract up to "PM"

        // Inline logic to handle "and" and commas in the days
        const daysTimePattern =
            /([\w\s,]+?)\s+(\d{1,2}(:\d{2})?(\s?(AM|PM))?)\s*-\s*(\d{1,2}(:\d{2})?\s?(AM|PM))/i
        const match = hoursText.match(daysTimePattern)

        let formattedHours = ''
        if (match) {
            let [
                _,
                days,
                startTimeFull,
                startTimeNum,
                ,
                startTimeAmPm,
                endTimeFull, // Capture the full end time string
                endTimeNum,
                ,
                endTimeAmPm, // Capture the AM/PM part of the end time
            ] = match

            const startTime = startTimeFull.trim()

            // Normalize days by replacing "and" and splitting by commas
            days = days
                .replace(/\sand\s/g, ',') // Replace "and" with a comma
                .split(',')
                .map((day) => day.trim()) // Split by commas and trim whitespace
                .map((day) => day.replace(/s$/, '')) // Remove trailing 's'
                .map(convertToShortDay) // Convert to short day format
                .join(', ') // Join back into a string

            // Format the end time: remove space and lowercase AM/PM
            let formattedEndTime = endTimeFull.trim()
            if (endTimeAmPm) {
                formattedEndTime = formattedEndTime
                    .replace(/\s+(AM|PM)$/i, '$1')
                    .toLowerCase()
            }

            formattedHours = `${days} ${startTime}-${formattedEndTime}`
        }

        // Add the formatted hours to the list_of_hours array
        const listOfHours = []
        listOfHours.push(formattedHours)

        const newResource = new IndResources({
            Title: title,
            ImageURL: image,
            ImageAltText: imageAlt,
            ParagraphText: paragraphText,
            ResourceURL: url,
            LastUpdate: new Date(),
            Category: "Let's Talk",
            ListOfHours: listOfHours,
            ExtraInfo: extraInfo,
            Address: meetingLink,
            Tags: ['Counseling', 'Mental Health', 'Wellness'],
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: lets_talk_id },
            newResource,
            { new: true, upsert: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send("Error fetching Let's Talk data")
    }
})

/* -------------------- STI TESTING -------------------- */
router.put('/sti-testing', async (req, res) => {
    try {
        const response = await axios.get('https://chw.calpoly.edu/sti-testing')
        const $ = cheerio.load(response.data)
        // For now we are going to hardcode the suicide_prevention_id
        const sti_testing_id = '6823e7b999f0f8a3c5c5dc69'

        // Extract header information
        // Specifically for this site, take the first part of title since it's repetittive
        const title =
            $('meta[property="og:title"]')
                .attr('content')
                .split('|')[0]
                .trim() ||
            $('title').text().trim() ||
            $('meta[name="title"]').attr('content')
        const url = $('meta[property="og:url"]').attr('content')

        // Extract image information
        const image = $('div[class="field-item even"]')
            .children()
            .find('img')
            .first()
            .attr('src')
        const image_alt =
            $('div[class="field-item even"]')
                .children()
                .find('img')
                .first()
                .attr('alt') || 'STI Testing Image' // Hardcode alt text since banner has none

        // Regex for extracting phone numbers and days of the week
        const daysRegex =
            /\b(Monday|Mon|Tuesday|Tues|Wednesday|Wed|Thursday|Thurs|Friday|Fri|Saturday|Sat|Sunday|Sun)\b/

        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g

        // Regex for extracting building
        const buildingRegex = /(Building\b) (\w+)/

        // Extract info bar information
        let column_info = []
        let phoneNum = ''
        let list_of_hours = []
        let location = ''

        // extract about us
        const aboutUs = []
        $('div[class="widget"] ul.cluster li p').each((_index, element) => {
            aboutUs.push($(element).text().trim())
        })

        aboutUs.forEach((element, _index) => {
            const column_info_text = element.trim()
            if (buildingRegex.test(column_info_text)) {
                // Found Building Location
                location = column_info_text.match(buildingRegex)[0]
            } else if (daysRegex.test(column_info_text)) {
                // If a day of the week is found : (likely for list of hours)
                const formattedDate = column_info_text
                    .split('\n') // Split by newline for multiple ranges
                    .map(formatHours1) // Format each part
                    .join(' \n') // Join them back with a newline
                list_of_hours.push(formattedDate)
            }
            if (phoneRegex.test(column_info_text)) {
                // Check if phone number is found
                phoneNum = column_info_text.match(phoneRegex)[0]
            } else {
                // Any other footer info we can put extract
                column_info.push(element.trim())
            }
        })

        // Extract main text information
        const mainText = []
        const extraInfo = []

        // Main text under banner
        mainText.push(
            $('div[class="field-item even"]')
                .find('h1')
                .find('strong')
                .text()
                .trim(),
        )

        // Main text bullet points
        $('div[class="field-item even"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element)
                if (
                    $paragraphText
                        .filter((_i, el) => $(el).attr('id') === 'subH1')
                        .text()
                        .trim()
                ) {
                    mainText.push($paragraphText.text().trim())
                }
            })

        // ExtraInfo
        extraInfo.push('Learn more about these:') // hard-code for the scraped ExtraInfo questions
        $('tr')
            .find('td')
            .each((_index, element) => {
                const $tableElement = $(element)
                const bannerText = $tableElement
                    .find('a')
                    .find('img')
                    .attr('alt')
                    .trim()
                const textSplit = bannerText.split('"')
                extraInfo.push(
                    textSplit.length > 1 ? textSplit[1] : textSplit[0],
                )
            })
        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            _id: sti_testing_id,
            Title: title,
            ImageURL: image,
            ImageAltText: image_alt,
            Address: location,
            BuildingName: location,
            ParagraphText: mainText.join('\n'),
            PhoneNumber: phoneNum,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Health Services',
            ListOfHours: list_of_hours,
            ExtraInfo: extraInfo,
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: sti_testing_id },
            newResource,
            { new: true, upsert: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Suicide Prevention data')
    }
})

/* -------------------- OFF CAMPUS HOUSING -------------------- */
router.put('/off-campus-housing', async (req, res) => {
    try {
        const response = await axios.get(
            'https://deanofstudents.calpoly.edu/offcampushousing',
        )
        const $ = cheerio.load(response.data)

        const offCampusHousingId = '67b38f58cd6ae1f04cf826d9'

        const title = 'Off-Campus Housing' // The title of the page is an image

        const url = $('meta[property="og:url"]').attr('content')

        const image = $('div[class="field-item even"]')
            .children('p')
            .children('img')
            .attr('src')

        const imageAlt =
            $('div[class="field-item even"]')
                .children('p')
                .children('img')
                .attr('alt')
                .trim() || 'Off-Campus Housing Program Banner'

        // Main paragraph with generic info
        const paragraphText = $('div[class="field-item even"]')
            .find('p')
            .eq(1)
            .text()
            .trim()

        // Adding the zoom meeting link as address
        const location = $('div[class="field-item even"]')
            .eq(0)
            .children()
            .eq(18)
            .text()
            .trim()

        // Meeting hours
        const hours = []

        const children = $('div[class="field-item even"]')
            .eq(0)
            .children()
            .slice(10, 17)

        let currentDay = null

        children.each((_index, element) => {
            const tag = $(element)[0].tagName
            const text = $(element).text().trim()

            if (tag === 'div') {
                currentDay = convertToShortDay(text)
            }

            if (tag === 'ul' && currentDay) {
                $(element)
                    .find('li')
                    .each((_i, li) => {
                        const timeRange = $(li).text().trim()
                        if (timeRange) {
                            if (
                                hours.length > 0 &&
                                hours[hours.length - 1].split(': ')[0] ==
                                    currentDay
                            ) {
                                // Check if previous list addition has the same day
                                hours[hours.length - 1] += `, ${timeRange}`
                            } else {
                                hours.push(`${currentDay}: ${timeRange}`)
                            }
                        }
                    })
            }
        })

        // Start grabbing text for extra info
        const extraInfo = []

        $('div[class="field-item even"]')
            .eq(0)
            .children()
            .slice(4, 6)
            .each((_index, element) => {
                const $paragraphText = $(element).text().trim()
                extraInfo.push($paragraphText)
            })

        $('div[class="field-item even"]')
            .eq(0)
            .children()
            .slice(7, 9)
            .each((_index, element) => {
                const $paragraphText = $(element).text().trim()
                extraInfo.push($paragraphText)
            })

        const newResource = new IndResources({
            Title: title,
            ImageURL: image,
            ImageAltText: imageAlt,
            ParagraphText: paragraphText,
            ResourceURL: url,
            LastUpdate: new Date(),
            Category: 'Housing Support',
            ExtraInfo: extraInfo,
            Address: location,
            ListOfHours: hours,
            Tags: ['Housing', 'Off Campus', 'Roommate'],
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: offCampusHousingId },
            newResource,
            { new: true, upsert: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Off Campus Housing data')
    }
})

/* -------------------- FIND A THERAPIST -------------------- */
router.put('/find-a-therapist', async (req, res) => {
    try {
        const response = await axios.get(
            'https://chw.calpoly.edu/counseling/community-referrals',
        )
        const $ = cheerio.load(response.data)
        // find_a_therapist_id references the existing resource object for this website
        const find_a_therapist_id = '67b38f41cd6ae1f04cf826d5'

        // Extract header information
        // Hard-coded title specifically for this site since we're using a different name
        const title = 'Find a Therapist'
        const url = $('meta[property="og:url"]').attr('content')

        // Extract image information
        const image = $('div[class="field-item even"]')
            .children()
            .find('img')
            .first()
            .attr('src')
        const image_alt =
            $('div[class="field-item even"]')
                .children()
                .find('img')
                .first()
                .attr('alt') || 'Find a Therapist Image' // Hardcode alt text since banner has none

        // Regex for extracting phone numbers, emails, and days of the week
        const daysRegex =
            /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/

        const phoneRegex =
            /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g
        // Note: modified so that first character cannot be a number (specific to Cal Fresh)
        const emailRegex =
            /[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

        // Regex for extracting building
        const buildingRegex = /(Building\b) (\w+)/
        // Regex for extracting hours
        const hoursRegex =
            /(\d{1,2}(:\d{2})?\s?(AM|PM))\s?-\s?(\d{1,2}(:\d{2})?\s?(AM|PM))\s?\|\s?([A-Za-z,-]+)/i

        // Extract info bar information
        let column_info = []
        let phoneNum = ''
        let email = ''
        let list_of_hours = []
        let location = ''

        $('div[id="rightCol"]')
            .children('div[id="block-block-13"]')
            .children('p')
            .each((_index, element) => {
                let $column_info_text = $(element).text().trim()
                if (buildingRegex.test($column_info_text)) {
                    location = $column_info_text.match(buildingRegex)[0]
                    // We know the rest of the information is hours info
                    // extract this and put into the list_of_hours array
                    $column_info_text = $column_info_text
                        .replace(location, '')
                        .trim()
                    const formattedDate = formatHours1(
                        $column_info_text.match(hoursRegex)[0],
                    )

                    list_of_hours.push(formattedDate)
                } else if (daysRegex.test($column_info_text)) {
                    // If a day of the week is found : (likely for list of hours)
                    const formattedDate = $column_info_text
                        .split('\n') // Split by newline for multiple ranges
                        .map(formatHours) // Format each part
                        .join(' \n') // Join them back with a newline
                    list_of_hours.push(formattedDate)
                }
                if (
                    phoneRegex.test($column_info_text) ||
                    emailRegex.test($column_info_text)
                ) {
                    // Check if phone number or email is found
                    phoneNum = $column_info_text.match(phoneRegex)[0]
                    email = $column_info_text.match(emailRegex)[0]
                } else {
                    // Any other footer info we can put extract
                    column_info.push($(element).text().trim())
                }
            })

        // Extract main text information
        const mainText = []
        const extraInfo = []

        let mainTextP = $('div[class="field-item even"]').find('p').first()

        // Get the first 2 <p> elements after the image containing some text
        let i = 0 // Safety to break potential infinite loop
        while (mainTextP && mainText.length < 2 && i < 10) {
            if (mainTextP.text().trim().length > 0) {
                // Only add <p>'s with text
                mainText.push($(mainTextP).text().trim())
            }
            mainTextP = $(mainTextP).next()
            i++
        }

        extraInfo.push('Check out the website for information about these:')
        $('div[class="field-item even"]')
            .find('p')
            .each((_index, element) => {
                const $paragraphText = $(element)
                // Conditions for finding ExtraInfo text
                if (
                    // Section header is an image with a non-empty alt
                    $paragraphText.find('img') &&
                    $paragraphText.find('img').attr('src') &&
                    $paragraphText
                        .find('img')
                        .attr('src')
                        .includes('amazonaws') &&
                    $paragraphText.find('img').attr('alt') != '' &&
                    $paragraphText.find('img').attr('src') != image
                ) {
                    extraInfo.push(
                        $paragraphText.find('img').attr('alt').trim(),
                    )
                }
            })

        const currentTime = new Date()

        // Store the resourceData into the database
        const newResource = new IndResources({
            _id: find_a_therapist_id,
            Title: title,
            ImageURL: image,
            ImageAltText: image_alt,
            Address: location,
            BuildingName: location,
            ParagraphText: mainText.join('\n'),
            PhoneNumber: phoneNum,
            ResourceURL: url,
            LastUpdate: currentTime,
            Category: 'Mental Health and Academic Resources',
            ListOfHours: list_of_hours,
            ExtraInfo: extraInfo,
            Tags: ['Mental Health', 'Therapy', 'Self Help'],
        })

        const updatedResource = await IndResources.findByIdAndUpdate(
            { _id: find_a_therapist_id },
            newResource,
            { new: true, upsert: true },
        )

        if (!updatedResource) {
            return res.status(404).send('Resource not found')
        }

        // Respond with the updated resource
        res.json(newResource)
    } catch (error) {
        console.error('Scrapping failed:', error)
        res.status(500).send('Error fetching Suicide Prevention data')
    }
})

module.exports = router
