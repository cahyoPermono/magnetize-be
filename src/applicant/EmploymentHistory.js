const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class EmploymentHistory extends Model {}

EmploymentHistory.init(
  {
    start: {
      type: Sequelize.STRING,
    },
    end: {
      type: Sequelize.STRING,
    },
    name_company: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    direct_supervisor: {
      type: Sequelize.STRING,
    },
    take_home_pay: {
      type: Sequelize.STRING,
    },
    reason_leaving: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'employmenthistory',
  }
);
EmploymentHistory.belongsTo(Applicant);
Applicant.hasMany(EmploymentHistory, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = EmploymentHistory;
