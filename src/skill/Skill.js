const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Job = require('./Job');

const Model = Sequelize.Model;

class Skill extends Model {}

Skill.init(
  {
    skill: {
      type: Sequelize.STRING,
    },
    jobId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'skill',
  }
);
Skill.belongsTo(Job);
Job.hasMany(Skill, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Skill;
