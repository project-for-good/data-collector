const ineScraper = require('./urban-travels.ine.scraper')
const fuelScraper = require('./fuel-prices.motor.scraper')
const formmater = require('./jsonDataFormatter')

// run scrapers
async function start(scrapPage) {
  if (scrapPage.includes("www.ine.es")) {
    formmater.formatData(await ineScraper.scrap())
  }
  if (scrapPage.includes("www.motor.es")) {
  formmater.formatData(fuelScraper.scrap())
  }
}
 start(process.env.PAGES_TO_SCRAPE)

//format and send  data

// NOMBRE DE VARIABLE: PAGES_TO_SCRAPE
// CONTENIDO: www.ine.es;www.motor.es