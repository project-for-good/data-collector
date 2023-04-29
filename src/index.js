const ineScraper = require('./ine.urban.travels.scraper')
const formmater = require('./jsonDataFormatter')

// run scrapers

async function start(params) {
  const data = await ineScraper.scrap();
  formmater.formatData(data);
}
 start()

//format and send  data

