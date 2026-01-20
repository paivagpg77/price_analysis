const selectors = require("../selectors.json");

async function customScrape(page, url) {
  const domain = new URL(url).hostname;
  const selector = selectors[domain];

  if (!selector) return null;

  await page.waitForSelector(selector, { timeout: 10000 });
  return await page.$eval(selector, el => el.innerText);
}

module.exports = customScrape;
