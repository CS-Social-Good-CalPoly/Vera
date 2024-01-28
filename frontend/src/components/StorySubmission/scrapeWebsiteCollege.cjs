const puppeteer = require('puppeteer');

async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Wait for all content to be fully loaded
  await page.waitForSelector('h2');

  // Extract content using DOM manipulation or selectors
  const colleges = await page.evaluate(() => {
    const h2Elements = Array.from(document.querySelectorAll('h2'));
        return h2Elements
            .map(h2 => h2.textContent.trim())
            .filter(college => college.startsWith('College'));
  });

  await browser.close();

  return colleges;
}

scrapeWebsite('https://www.calpoly.edu/colleges-departments-and-majors')
  .then(colleges => {
    console.log('Colleges:', colleges);
  })
  .catch(error => {
    console.error('Error:', error);
  });
