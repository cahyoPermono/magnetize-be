const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;

class Departements extends Model {}

Departements.init(
  {
    nama: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    industri: {
      type: Sequelize.STRING,
    },
    lokasi: {
      type: Sequelize.STRING,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    deskripsi: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.TEXT('long'),
    },
  },
  {
    sequelize,
    modelName: "departements",
  }
);

module.exports = Departements;
