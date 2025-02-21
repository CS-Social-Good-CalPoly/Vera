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
    const hoursRegex = /.*\s+(\w+)\s+through\s+(\w+)\s+from\s+(\d{1,2}):(\d{2})(AM|PM)\s+to\s+(\d{1,2}):(\d{2})(AM|PM).*/ // regex pattern for hours
    const matchText = text.match(hoursRegex) // match the text with the pattern

    if (matchText) {
        let [_, startDay, endDay, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod] = matchText // split up matchText into variables
        startDay = convertToShortDay(startDay) // convert days to short form
        endDay = convertToShortDay(endDay) // convert days to short form

        const daysRange = startDay === endDay ? startDay : `${startDay}-${endDay}` // format days

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

        // Debugging: Check if page loaded
        console.log('Page loaded successfully')

        // Extract Title
        const Title = $('h1.page-title').text().trim()
        console.log('Title:', Title)

        // Extract Image URL
        let ImageURL = $('div.field-item.even img').attr('src') || ''
        let ImageAltText = $('div.field-item.even img').attr('alt').trim() || ''
        console.log('Image URL:', ImageURL)
        console.log('Image Alt:', ImageAltText)

        // Extracting the building name under "Location" h3
        const BuildingName = $('h3:contains("Location")')
            .next('p')
            .find('a')
            .text()
            .trim()
        console.log('Building Name:', BuildingName)

        // Extract Paragraph
        const ParagraphText = $('div.clear').first().text().trim()
        console.log('Paragraph Text:', ParagraphText)

        // Extract Phone Number
        const PhoneNumber = $('a[href^="tel"]').first().text().trim()
        console.log('Phone Number:', PhoneNumber)

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
        console.log('List of Hours:', ListOfHours)

        // Extract extra info as an array of objects { text, url }
        const ExtraInfo = []
        $('h2:has(img[alt="Covid 19 testing resources"])')
            .next('ul')
            .find('li')
            .each((index, element) => {
                const fullText = $(element).text().trim() // Extract only text
                ExtraInfo.push(fullText) // Push only the text, no links
            })

        console.log('Extra Info:', ExtraInfo)

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

/* ------------------------- FOOD PANTRY ------------------------- */
router.put('/scrapefoodpantry', async (req, res) => {
    try {
        const webpage = await axios.get('https://basicneeds.calpoly.edu/foodpantry') // fetch the webpage
        const $ = cheerio.load(webpage.data) // load the static webpage into cheerio
    
        const ImageURL = $("#header-1 a img").attr("src") // Getting the image URL located in header-1 -> a -> img
        const ImageAltText = "Cal Poly Food Pantry" // Alt text for the image
        const Title = $('h1.page-title').text().trim() // Getting the title located in the page-title class
        const Category = 'Food Resources' // Category of the resource is food resources
        const ResourceURL = 'https://basicneeds.calpoly.edu/foodpantry' // URL of the resource 

        const ParagraphText = $('.field-item.even p').first().text().trim() // Getting the paragraph text located in the field-item even class
        const AccessingFoodPantry = $("#Accessing_the_Cal_Poly_Food_Pantry").parent().next().text().trim() 
        const FoodSource = $("#Where_does_the_food_come_from").parent().next().text().trim() 


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
        
        let ListOfHours = $("#Hours_for_Cal_Poly_Students").parent().next().text().trim();
        ListOfHours = ListOfHours.split('.', 1)[0]

        const FormattedHours = formatHoursFoodPantry(ListOfHours) // format the hours and save it
        
        // Create a new resource object for the Food Pantry
        const foodPantryResource = new IndResources({
            ImageURL: ImageURL,
            imageAltText: ImageAltText,
            Title: Title,
            Address: Address,
            BuildingName: BuildingName,
            ParagraphText: ParagraphText,
            PhoneNumber: PhoneNumber,
            ResourceURL: ResourceURL,
            LastUpdate: LastUpdate,
            Category: Category,
            ExtraInfo: [AccessingFoodPantry, FoodSource],
            ListOfHours: [FormattedHours],
            WhatToExpect: ''
        })
        
        const updatedResource = await IndResources.findByIdAndUpdate( // save the resource to the database)
            {_id : "60a5a5661d9811d718c3d998"},
            foodPantryResource,
            {new : true}
        ); 
        
        res.json(foodPantryResource) // return the resource 

    }  catch (error) {
        console.error('Scraping failed:', error)
        res.status(500).send('Error fetching food pantry data')
    }

    
})

//TODO: Add the "||" statements for every single scrape in case it didn't work