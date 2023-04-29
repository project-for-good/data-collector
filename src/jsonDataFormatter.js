const fs = require('fs')

const formatData = (data) => {

    var jsonContent = JSON.stringify(data)

    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.")
            return console.log(err)
        }

        console.log("JSON file has been saved.")
    })
}

module.exports = {
    formatData
}