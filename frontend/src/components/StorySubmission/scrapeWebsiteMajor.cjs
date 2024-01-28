const puppeteer = require('puppeteer');

async function scrapeWebsite(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Wait for all content to be fully loaded
  await page.waitForSelector('a');

  // Extract content using DOM manipulation or selectors
  const majors = await page.evaluate(() => {
    const h2Elements = Array.from(document.querySelectorAll('a'));
        return h2Elements
            .map(a => a.textContent.trim())
            .filter(text => text.endsWith('Major'));
  });

  await browser.close();

  return majors;
}

scrapeWebsite('https://www.calpoly.edu/colleges-departments-and-majors')
  .then(majors => {
    console.log('Major:', majors);
  })
  .catch(error => {
    console.error('Error:', error);
  });
