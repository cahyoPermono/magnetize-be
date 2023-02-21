const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class DepartementCategories extends Model {}

DepartementCategories.init(
  {
    category: {
      type: Sequelize.STRING,
    }
  },
  {
    sequelize,
    modelName: 'departementCategories',
  }
);

module.exports = DepartementCategories;
