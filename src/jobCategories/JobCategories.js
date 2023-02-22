const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class JobCategories extends Model {}

JobCategories.init(
  {
    category: {
      type: Sequelize.STRING,
    }
  },
  {
    sequelize,
    modelName: 'jobCategories',
  }
);

module.exports = JobCategories;
