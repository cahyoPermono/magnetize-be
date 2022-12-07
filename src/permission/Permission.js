const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;

class Permission extends Model {}

Permission.init(
  {
    permission: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'permission',
  }
);

module.exports = Permission;
