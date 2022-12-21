const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Role = require('../role/Role');

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    displayName: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.STRING,
    },
    roleId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    phone: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.TEXT('long'),
    },
    lastActive: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);
User.belongsTo(Role);
Role.hasMany(User, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
