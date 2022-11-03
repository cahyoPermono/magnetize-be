const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class Family extends Model {}

Family.init(
  {
    // marital_status: {
    //   type: Sequelize.STRING,
    // },
    member: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.ENUM('L', 'P'),
    },
    date: {
      type: Sequelize.DATE,
    },
    education: {
      type: Sequelize.STRING,
    },
    occupation_company: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'family',
  }
);
Family.belongsTo(Applicant);
Applicant.hasMany(Family, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Family;
