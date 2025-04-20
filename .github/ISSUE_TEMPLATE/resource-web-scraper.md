---
name: Resource Web Scraper
about: Issue template for resource web scraping tasks
title: "[Web Scraper]"
labels: backend
assignees: ''

---

### Problem

We want to start filling Vera with real deployment resources! Create a PUT request to web scrape the provided URL to populate the Resources page.

The Idea is to have a set of web scrapers for specific pages. We do not want to link these to specific buttons, routes, or interactions with the website. Instead, these should run periodically (ex: every 3 months) by the project leads to make sure the resource information is up-to-date (but DON'T worry about implementing periodic execution right now, just make the API request).

Since these PUT won't be connected to any website interaction, you'll need to manually make a PUT request with Postman. You should see the newly created resource at the end of the "individual-resources" collection in MongoDB.

URL: [INSERT URL HERE]

### Task
- [ ] Create a PUT request in `backend/routes/web_scrapping.js`. Since each web scraper is unique to the URL page, we suggest keeping the entire web scraping code within the PUT request, but we're open to different code design choices!
- [ ] Find as much information for the `IndResSchema` as possible (`/backend/models/IndividualResources.js`)
- [ ] These fields MUST be populated by your request:
    - [ ] `Title`: 
    - [ ] `ImageURL`: 
    - [ ] `ImageAltText`: this is always required for any image
    - [ ] `Address`: 
    - [ ] `BuildingName`: 
    - [ ] `ParagraphText`: 
    - [ ] `PhoneNumber`: 
    - [ ] `ResourceURL`: 
    - [ ] `LastUpdate`: should be the current time
    - [ ] `Category`: [something hard-coded, like "Health Services"]
    - [ ] `ListOfHours`: [INFO ABOUT HOURS]. Different time blocks should be stored as different list elements. For example, the list should look something like `["Mon-Wed: 12:00 PM - 1:00 PM", "Sat: 6:00 AM - 6:00 PM"]`
    - [ ] `ExtraInfo`: include the following:
        - [ ] info1
        - [ ] info2
- [ ] Use Postman (or something similar) to manually make a POST request. Verify that the new resource appears in MongoDB (include a screenshot in your PR)

### Notes
Use previous routes in `web_scraping.js` as a reference for using axios and cheerio for web scraping. 

Make sure you `git pull` every time you start working on Vera to avoid merge conflicts! You should also be working on a different branch (do NOT work in main!). Please include this issue number in your PR

Example:
```router.put('/new-resource', async (req, res) => {
  try {
    // Step 1: Fetch the HTML
    const url = 'https://example.com/new-resource';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Step 2: Extracting Data with Cheerio
    const title = $('h1.main-title').text().trim();
    const imageURL = $('img.main-image').attr('src') || 'Default URL';
    const imageAltText = $('img.main-image').attr('alt') || 'Default Alt';

    const paragraphText = $('div.content p.intro').first().text().trim();

    const phoneNumber = $('a[href^="tel:"]').first().text().trim();

    const buildingName = $('div.address h3').text().trim();

    // Extracting hours of operation (example)
    const hoursText = $('div.hours').text().trim();
    const formattedHours = formatHours(hoursText); // Use provided helper function

    // Extra Info (as an array)
    const extraInfo = [];
    $('div.extra-info li').each((i, elem) => {
      extraInfo.push($(elem).text().trim());
    });

    // Current timestamp
    const currentTime = new Date();

    // Step 3: Save or update data in MongoDB
    const resourceData = {
      Title: title,
      ImageURL: imageURL,
      ImageAltText: imageAltText,
      BuildingName: buildingName,
      ParagraphText: paragraphText,
      PhoneNumber: phoneNumber,
      ListOfHours: [formattedHours],
      ExtraInfo: extraInfo,
      ResourceURL: url,
      LastUpdate: currentTime,
      Category: 'Example Category',  // Adjust based on your data
    };

    const updatedResource = await IndResources.findOneAndUpdate(
      { ResourceURL: url },  // unique field for updating
      resourceData,
      { new: true, upsert: true },  // create or update
    );

    // Send success response
    res.status(200).json({
      message: 'Scraped data successfully stored in MongoDB',
      data: updatedResource,
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      error: 'An error occurred while scraping the resource.',
    });
  }
});
```
