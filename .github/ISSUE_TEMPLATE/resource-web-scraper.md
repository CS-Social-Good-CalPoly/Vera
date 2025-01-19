---
name: Resource Web Scraper
about: Issue template for resource web scraping tasks
title: "[Web Scraper]"
labels: backend
assignees: ''

---

### Problem

We want to start filling Vera with real deployment resources! Create a POST request to web scrape the provided URL to populate the Resources page.

The Idea is to have a set of web scrapers for specific pages. We do not want to link these to specific buttons, routes, or interactions with the website. Instead, these should run periodically (ex: every 3 months) by the project leads to make sure the resource information is up-to-date (but DON'T worry about implementing periodic execution right now, just make the API request).

Since these POST won't be connected to any website interaction, you'll need to manually make a POST request with Postman. You should see the newly created resource at the end of the "individual-resources" collection in MongoDB. Copy and paste the ObjectId for your individual resource and append it to the "SubCategoryIDList" field in the "Dev-Resources" document under "general-resource-category".

URL: [INSERT URL HERE]

### Task
- [ ] Create a POST request in `backend/routes/web_scrapping.js`. Since each web scraper is unique to the URL page, we suggest keeping the entire web scraping code within the POST request, but we're open to different code design choices!
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
    - [ ] `ListOfHours`: 
    - [ ] `ExtraInfo`: include the following:
        - [ ] info1
        - [ ] info2
- [ ] Use Postman (or something similar) to manually make a POST request. Verify that the new resource appears in MongoDB (include a screenshot in your PR)
- [ ] Copy the new individual resource ObjectId and add it to the "Dev-Resources" document under "general-resource-category" in MongoDB. Verify that your individual resource appears on the website now (include a screenshot in your PR)

### Notes
Use the `router.get('/colleges-and-majors'...` in `backend/routes/stories.js` API request as a reference for using axios and cheerio for web scraping. Note, this specific function is a GET request, but we want a POST request. Use other POST requests in the same page (`stories.js`) as a reference if you're unfamiliar with making POST requests in Express.

Make sure you `git pull` every time you start working on Vera to avoid merge conflicts! You should also be working on a different branch (do NOT work in main!)
