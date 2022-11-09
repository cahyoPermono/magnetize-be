const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class JobDescription extends Model {}

JobDescription.init(
  {
    description: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'jobdescription',
  }
);
JobDescription.belongsTo(Applicant);
Applicant.hasOne(JobDescription, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = JobDescription;
