const axios = require('axios');

const getData = async () => {
    const res = await axios.get("https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/55226?tip=AM&", {});

    const data = await res.data
        .filter(item => item.Nombre.includes("TOTAL, 04 Balears, Illes, Ambos sexos"))
        .filter(
            item => item.MetaData[3].Nombre &&
                parseInt(item.MetaData[3].Nombre) >= 18 &&
                parseInt(item.MetaData[3].Nombre) <= 25
        )

    const asd = data.map(result => {

        return {
            location: result.MetaData[1].Nombre,
            age: result.MetaData[3].Nombre,
            year: new Date().getFullYear(),
            data: result.Data[0].Valor
        }
    })
    return asd
}


module.exports = {
    getData
}