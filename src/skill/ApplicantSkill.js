const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const SubSkill = require('./SubSkill');
const Applicant = require('../applicant/Applicant');

const Model = Sequelize.Model;

class ApplicantSkill extends Model {}

ApplicantSkill.init(
  {
    nilai: {
      type: Sequelize.STRING,
    },
    keterangan: {
      type: Sequelize.STRING,
    },
    subskillId: {
      type: Sequelize.INTEGER,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'applicantskill',
  }
);
ApplicantSkill.belongsTo(SubSkill);
ApplicantSkill.belongsTo(Applicant);
SubSkill.hasMany(ApplicantSkill, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Applicant.hasMany(ApplicantSkill, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ApplicantSkill;
