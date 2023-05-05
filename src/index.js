const ineScraper = require('./urban-travels.ine.scraper')
const fuelScraper = require('./fuel-prices.motor.scraper')
const population = require('./population.ine')
const carByperson = require('./ibestat-caib.es.scraper')
const accuweather = require('./accuwheater.scraper')
const formmater = require('./jsonDataFormatter')

// run scrapers
async function start(scrapPage) {
  if (scrapPage.includes("www.ine.es")) {
    formmater.formatData(await ineScraper.scrap())
  }

  if (scrapPage.includes("www.motor.es")) {
    formmater.formatData(await fuelScraper.scrap())
  }

  if (scrapPage.includes("www.population.ine.es")) {
    formmater.formatData(await population.getData())
  }

  if (scrapPage.includes("www.caib.es/ibestat")) {
    formmater.formatData(await carByperson.scrap())
  }

  if (scrapPage.includes("www.accuweather.com")) {
    formmater.formatData(await accuweather.scrap())
  }
}

start(process.env.PAGES_TO_SCRAPE)

//format and send  data

// NOMBRE DE VARIABLE: PAGES_TO_SCRAPE
// CONTENIDO: www.ine.es;www.motor.es