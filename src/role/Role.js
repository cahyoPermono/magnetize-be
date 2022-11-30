const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Permission = require('../permission/Permission');

const Model = Sequelize.Model;

class Role extends Model {
  static associate() {
    Role.belongsToMany(Permission, {
      through: 'RolePermission',
      as: 'permissions',
      foreignKey: 'roleId',
    });
  }
}

Role.init(
  {
    role: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'role',
  }
);

module.exports = Role;
