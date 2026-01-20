const puppeteer = require("puppeteer");
const autoScrape = require("./auto");
const customScrape = require("./custom");

async function getPrice(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });


  await page.waitForTimeout(5000);

  let priceText = null;

  try {
    priceText = await customScrape(page, url);
  } catch {}


  if (!priceText) {
    try {
      priceText = await autoScrape(page);
    } catch {}
  }


  if (!priceText) {
    priceText = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const match = bodyText.match(/R\$\s?\d{1,3}(\.\d{3})*,\d{2}/);
      return match ? match[0] : null;
    });
  }

  await browser.close();

  if (!priceText) {
    throw new Error("Preço não encontrado (JS dinâmico)");
  }

  return parseFloat(
    priceText
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
}

module.exports = { getPrice };
