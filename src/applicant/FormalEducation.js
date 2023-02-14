const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class FormalEducation extends Model {}

FormalEducation.init(
  {
    level: {
      type: Sequelize.STRING,
    },
    name_location: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    gpa: {
      type: Sequelize.STRING,
    },
    major: {
      type: Sequelize.STRING,
    },
    entry: {
      type: Sequelize.STRING,
    },
    graduate: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'formaleducation',
  }
);
FormalEducation.belongsTo(Applicant);
Applicant.hasMany(FormalEducation, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = FormalEducation;
