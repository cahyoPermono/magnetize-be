const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Permission = require('../permission/Permission');
const Role = require('../role/Role');

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

Role.belongsToMany(Permission, {through: RolePermission});
Permission.belongsToMany(Role, {through: RolePermission});
Role.hasMany(RolePermission);
RolePermission.belongsTo(Role);
Permission.hasMany(RolePermission);
RolePermission.belongsTo(Permission);

module.exports = RolePermission;
