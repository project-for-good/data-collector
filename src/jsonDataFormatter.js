const fs = require('fs')
const axios = require('axios')



const sendData = async (data, path) => {
    try {
      const res = await axios.post('http://localhost:9000' + path, await data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log(res.data)
      console.log("JSON file has been uploaded.")
    } catch (error) {
      console.error(error)
      return error
    }
  }

module.exports = {
    sendData
}