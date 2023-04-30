const ineScraper = require('./urban-travels.ine.scraper')
const formmater = require('./jsonDataFormatter')

// run scrapers

async function start(params) {
  const data = await ineScraper.scrap();
  formmater.formatData(data);
}
 start()

//format and send  data

// NOMBRE DE VARIABLE: PAGES_TO_SCRAPE
// CONTENIDO: www.ine.es;www.motor.es