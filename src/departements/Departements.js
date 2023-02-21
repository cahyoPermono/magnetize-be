const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const DepartementCategories = require("../departementCategories/DepartementCategories");

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
    DepartementCategoryId: {
      type: Sequelize.INTEGER,
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

DepartementCategories.hasMany(Departements, {
  foreignKey: 'DepartementCategoryId',
});
Departements.belongsTo(DepartementCategories, {
  foreignKey: 'DepartementCategoryId',
});

module.exports = Departements;
