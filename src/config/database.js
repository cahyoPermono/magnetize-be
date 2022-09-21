const Sequelize = require('sequelize');

const sequelize = new Sequelize('magnetize', 'root', '123321', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
