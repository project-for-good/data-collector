const puppeteer = require('puppeteer')

const url = 'https://www.accuweather.com/es/es/palma/308014/air-quality-index/308014#:~:text=17%20AQI,al%20aire%20libre%20con%20normalidad'

async function getResults() {

    let results = []
    let headers = ["o_3", "pm_10", "pm_2_5", "no_2", "co", "so_2", "aqi"]
    const browser = await puppeteer.launch(/*{ headless: false }*/)
    const page = await browser.newPage()
    await page.setViewport({
        width: 2920,
        height: 2080
    })
    await page.goto(url)
    await page.waitForSelector(("#view-more-pollutants"))
    await page.click(("#view-more-pollutants"))

    const data = await page.evaluate(() => {
        const cells = document.querySelectorAll(".pollutant-concentration")
        const res = []
        for (let i = 0; i < cells.length; i++) {
            res.push(cells[i].innerHTML.split(" ")[0])
        }
        res.push(document.querySelector(".aq-number").innerHTML.replace(/\t/g, '').replace(/\n/g, ''))
        return res.filter((item, i) => i % 2 === 0)
    })
    browser.close()

    headers.forEach((header, i) => {

        results[header] = data[i]
    })
    results.municipality = "Mallorca"

    return results

}
const scrap = async () => {
    return await getResults()
}

module.exports = {
    scrap
}