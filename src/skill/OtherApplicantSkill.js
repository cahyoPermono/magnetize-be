const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('../applicant/Applicant');

const Model = Sequelize.Model;

class OtherApplicantSkill extends Model {}

OtherApplicantSkill.init(
  {
    nama: {
      type: Sequelize.STRING,
    },
    nilai: {
      type: Sequelize.STRING,
    },
    keterangan: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'otherapplicantskill',
  }
);
OtherApplicantSkill.belongsTo(Applicant);
Applicant.hasMany(OtherApplicantSkill, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OtherApplicantSkill;
