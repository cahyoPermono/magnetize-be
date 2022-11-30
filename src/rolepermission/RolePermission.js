const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = Sequelize.Model;

class RolePermission extends Model {}

RolePermission.init(
  {
    roleId: {
      type: Sequelize.INTEGER,
    },
    permissionId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'rolepermission',
  }
);

module.exports = RolePermission;
