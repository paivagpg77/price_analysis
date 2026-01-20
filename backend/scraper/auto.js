async function autoScrape(page) {
  const selectors = [
    "[itemprop='price']",
    "[data-testid*='price']",
    "span[class*='price']",
    "div[class*='price']",
    "strong[class*='price']"
  ];

  for (const selector of selectors) {
    const el = await page.$(selector);
    if (el) {
      const text = await page.evaluate(e => e.innerText, el);
      if (text && text.includes("R$")) return text;
    }
  }

  return null;
}

module.exports = autoScrape;
