const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Role = require('../role/Role');

const Model = Sequelize.Model;

class Permission extends Model {
  static associate() {
    Permission.belongsToMany(Role, {
      through: 'RolePermission',
      as: 'roles',
      foreignKey: 'permissionId',
    });
  }
}

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
