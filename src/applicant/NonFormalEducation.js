const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class NonFormalEducation extends Model {}

NonFormalEducation.init(
  {
    course: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
    certificate: {
      type: Sequelize.STRING,
    },
    sponsored_by: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'nonformalEducations',
  }
);
NonFormalEducation.belongsTo(Applicant);
Applicant.hasMany(NonFormalEducation, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = NonFormalEducation;
