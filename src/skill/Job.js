const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class Job extends Model {}

Job.init(
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'job',
  }
);

module.exports = Job;
