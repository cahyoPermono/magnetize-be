const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Departements = require('../departements/Departements');
const JobCategories = require('../jobCategories/JobCategories');
const Users = require("../user/User");

// initiate model for extend
const Model = Sequelize.Model;

class Job extends Model { }

Job.init(
  {
    name: {
      type: Sequelize.STRING,
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
    JobCategoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'jobCategories',
        key: 'id',
      },
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
Job.belongsTo(Departements,{
  foreignKey:"DepartementId",
});
Departements.hasMany(Job, {
  foreignKey:"DepartementId"
});
Job.belongsTo(JobCategories,{
  foreignKey:"JobCategoryId",
});
JobCategories.hasMany(Job, {
  foreignKey:"JobCategoryId"
});

module.exports = Job;
