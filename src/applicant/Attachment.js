const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class Attachment extends Model {}

Attachment.init(
  {
    type: {
      type: Sequelize.STRING,
    },
    file: {
      type: Sequelize.STRING,
    },
    applicantId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'attachment',
  }
);
Attachment.belongsTo(Applicant);
Applicant.hasMany(Attachment, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Attachment;
