const puppeteer = require('puppeteer')

const url = 'https://www.motor.es/energia/precios-combustible-hoy'

async function getResults(filters) {
    const browser = await puppeteer.launch(/*{ headless: false }*/)
    const page = await browser.newPage()
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    })
    await page.goto(url)
    // click accept coockies so the pop up dissapears
    page.waitForSelector("#denegar_btn")
    page.click("#denegar_btn")

    // remove the blocking div
    await page.evaluate(() => {
        var element = document.querySelector("sibbo-cmp-layout");
        element.parentNode.removeChild(element);
    })

    await page.waitForTimeout(1000)

    await page.focus("table.resultados-table")
    const results = []
    const fuelTypes = ['Gasolina 95', 'Gasolina 98', 'Gasóleo A', 'Gasóleo A+']
    for (let i = 1; i < 5; i++) {
        const result = await page.evaluate((i) => {
            window.scrollTo(0, document.body.scrollHeight / 2);
            const div = document.querySelector(".resultados-table-wrapper")
            div.scrollBy(0, div.scrollHeight);
            const secondTable = document.querySelectorAll(`table.resultados-table`)[1]
            return secondTable.querySelector(`tbody tr:nth-child(${i}) td:nth-child(10) span`).innerHTML.replace(",",".")
        }, i)
        results.push({
            fuelType: fuelTypes[i-1],
            result: parseFloat(result)
        })
    }
    browser.close()
    return results

}

const scrap = async () => {
    return await getResults()
}

module.exports = {
    scrap
}
