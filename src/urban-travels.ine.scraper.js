const puppeteer = require('puppeteer')

const url = 'https://www.ine.es/jaxiT3/Tabla.htm?t=20193'

async function setFilters() {
    const browser = await puppeteer.launch(/*{ headless: false }*/)
    const page = await browser.newPage()
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto(url)


    await page.waitForSelector(("#tg80331"))
    await page.click(".jP_0")

    const filterIds = ["#tg80331", "#tg80332", "#tg80333", "#caja_periodo"]
    const filterNames = await page
        .evaluate((filterIds) => filterIds
            .map(filterId => document.querySelector(`${filterId} legend label`).innerHTML)
            , filterIds)

    const filterValues = await page
        .evaluate((filterIds) => {
            const options = filterIds
                .map(filterId => Array.from(document.querySelectorAll(`${filterId} select option`))
                    .map(option => option.textContent)
                )
            return options
        }
            , filterIds)

    const filters = filterNames.map((name, i) => {

        const filter = {
            id: filterIds[i],
            name,
            values: filterValues[i]
        }

        return filter
    })
    browser.close()
    return filters
}

async function getResults(filters) {

    let results = []

    const browser = await puppeteer.launch(/*{ headless: false }*/)
    const page = await browser.newPage()
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto(url)
    await page.waitForSelector(("#tg80331"))

    let i1 = 0
    let i2 = 0
    let i3 = 0
    let i4 = 0
    while (i1 < filters[0].values.length - 1) {
        const [button1] = await page.$x(`//option[contains(., '${filters[0].values[i1]}')]`)
        await button1.click()
        const [button2] = await page.$x(`//option[contains(., '${filters[1].values[4]}')]`)
        await button2.click()
        const [button3] = await page.$x(`//option[contains(., '${filters[2].values[i3]}')]`)
        await button3.click()
        const [button4] = await page.$x(`//option[contains(., '${filters[3].values[i4]}')]`)
        await button4.click()


        page.$eval(`#botonConsulSele`, element =>
            element.click()
        )
        await page.waitForTimeout(1700)
        const result = (await page.evaluate(() => document.querySelector("td.sd").innerHTML)).split(">")[1]
        results.push({
            headers: [filters[0].name, filters[1].name, filters[2].name, filters[3].name],
            params: [filters[0].values[i1], filters[1].values[4], filters[2].values[i3], filters[3].values[i4]],
            result: parseInt(result).toFixed(1)
        })
        console.log(result)

        if (i4 < 3) {
            i4++
        } else if (i3 < filters[2].values.length -1) {
            i3++
            i4 = 0
        }else {
            i1++
            i3 = 0
            i4 = 0
        }
        await page.goBack()
        await page.waitForTimeout(1000)
    }
    browser.close()
    return results
    
}
const scrap = async () => {
    const filters = await setFilters()
    return await getResults(filters)   
}

module.exports = {
    scrap
  }