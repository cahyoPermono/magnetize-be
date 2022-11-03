const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class ComputerLiterate extends Model {}

ComputerLiterate.init(
  {
    skill: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'computerliterate',
  }
);
ComputerLiterate.belongsTo(Applicant);
Applicant.hasMany(ComputerLiterate, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ComputerLiterate;
