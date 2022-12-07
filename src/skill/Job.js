const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Departements = require("../departements/Departements");
const Users = require("../user/User");

// initiate model for extend
const Model = Sequelize.Model;

class Job extends Model { }

Job.init(
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    DepartementId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'departements',
        key: 'id',
      },
    },
    location:{
      type: Sequelize.STRING,
    },
    remote:{
      type: Sequelize.BOOLEAN
    },
    headcount:{
      type: Sequelize.INTEGER,
    },
    contract_detail:{
      type: Sequelize.STRING,
    },
    currency:{
      type: Sequelize.STRING,
    },
    min_salary:{
      type: Sequelize.STRING,
    },
    max_salary:{
      type: Sequelize.STRING,
    },
    status:{
      type: Sequelize.STRING,
    },
    desc:{
      type: Sequelize.STRING,
    },
    package_detail:{
      type: Sequelize.STRING,
    },
    payment_frequency:{
      type: Sequelize.STRING,
    },
    creator_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'jobs',
  }
);

Job.belongsTo(Users,{
  foreignKey:"creator_id",
});
Users.hasMany(Job, {
  foreignKey:"creator_id"
});

module.exports = Job;
