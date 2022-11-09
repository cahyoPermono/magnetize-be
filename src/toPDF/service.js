const Departements = require("../departements/Departements");

exports.toPDF = async () => {
    const data = await Departements.findAll();


    return data
}

