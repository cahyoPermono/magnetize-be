const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Applicant = require("./Applicant");

const Model = Sequelize.Model;

class OtherInformation extends Model {}

OtherInformation.init(
  {
    hospitalized: {
      type: Sequelize.STRING,
    },
    disease: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    psycological_test: {
      type: Sequelize.STRING,
    },
    experience_tellecomunication: {
      type: Sequelize.STRING,
    },
    experience_it: {
      type: Sequelize.STRING,
    },
    reason_join: {
      type: Sequelize.STRING,
    },
    reason_hire: {
      type: Sequelize.STRING,
    },
    opinion_teamwork: {
      type: Sequelize.STRING,
    },
    plan: {
      type: Sequelize.STRING,
    },
    respond_target: {
      type: Sequelize.STRING,
    },
    respond_preasure: {
      type: Sequelize.STRING,
    },
    reason_leave_last_company: {
      type: Sequelize.STRING,
    },
    salary_expect: {
      type: Sequelize.STRING,
    },
    able_to_start: {
      type: Sequelize.STRING,
    },
    contact_emergency: {
      type: Sequelize.STRING,
    },
    relatives_in_ip: {
      type: Sequelize.STRING,
    },
    strength: {
      type: Sequelize.STRING,
    },
    weakness: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "otherinformation",
  }
);
OtherInformation.belongsTo(Applicant);
Applicant.hasOne(OtherInformation, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OtherInformation;
