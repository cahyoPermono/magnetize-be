const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class Guest extends Model {}

Guest.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    major: {
      type: Sequelize.STRING,
    },
    generation: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    posisi: {
      type: Sequelize.STRING,
    },
    cv: {
      type: Sequelize.TEXT('long'),
    },
  },
  {
    sequelize,
    modelName: 'guest',
  }
);

module.exports = Guest;
