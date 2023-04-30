const puppeteer = require('puppeteer')

const url = 'https://www.motor.es/energia/precios-combustible-hoy'

async function getResults(filters) {

    
        const result = (await page.evaluate(() => document.querySelector("td.sd").innerHTML)).split(">")[1]
        results.push({
            headers: [filters[0].name, filters[1].name, filters[2].name, filters[3].name],
            params: [filters[0].values[i1], filters[1].values[4], filters[2].values[i3], filters[3].values[i4]],
            result: parseInt(result).toFixed(1)
        })
        console.log(result)

        
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
