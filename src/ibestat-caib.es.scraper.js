const puppeteer = require('puppeteer')

const url = 'https://www.caib.es/ibestat/estadistiques/per-territori/1/f4e4a288-e0d8-40ce-b53f-6ed6b0d16d7d/es/E70044_00003.px'

async function getResults() {

    let results = []

    const browser = await puppeteer.launch(/*{ headless: false }*/)
    const page = await browser.newPage()
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto(url)
    await page.waitForSelector((".dataCell.bottom"))
    const data = await page.evaluate( () =>{
        window.scrollTo(0, document.body.scrollHeight / 2);
        const cells = document.querySelectorAll(".dataCell.bottom")
        const res = []
        for (let i = 0; i < cells.length; i++) {
            res.push(parseInt(cells[i].innerHTML.replace(/\t/g, '').replace(/\n/g, '')))
        }
        return res
    })
    let year = new Date().getFullYear()
    results = data.map( (result,i) => {
        let total = "Total"
        if(i%2 !== 0) total = "Turismos"
        if(i%2 === 0) year--
        return {
            municipality: "Mallorca",
            year,
            total,
            passengers_cars: result
        }
    })
    browser.close()
    return results
    
}
const scrap = async () => {
    return await getResults()
}

module.exports = {
    scrap
  }