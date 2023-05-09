const ineScraper = require('./urban-travels.ine.scraper')
const fuelScraper = require('./fuel-prices.motor.scraper')
const population = require('./population.ine')
const carByperson = require('./ibestat-caib.es.scraper')
const accuweather = require('./accuwheater.scraper')
const formmater = require('./jsonDataFormatter')

// run scrapers
async function start(scrapPage) {
  if (scrapPage.includes("www.ine.es/urban")) {
    formmater.sendData(await ineScraper.scrap(),"/api/v1/urbanIne")
  }

  if (scrapPage.includes("www.motor.es")) {
    formmater.sendData(await fuelScraper.scrap(),"/api/v1/motor")
  }

  if (scrapPage.includes("www.ine.es/population")) {
    formmater.sendData(await population.getData(),"/api/v1/populationIne")
  }

  if (scrapPage.includes("www.caib.es/ibestat")) {
    formmater.sendData(await carByperson.scrap(),"/api/v1/vehicles")
  }

  if (scrapPage.includes("www.accuwheater.com")) {
    const asd = await accuweather.getResults()
    await formmater.sendData(asd,"/api/v1/accuwheater")
  }
}

start(process.env.PAGES_TO_SCRAPE)
