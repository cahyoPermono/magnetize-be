const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');

const Model = Sequelize.Model;

class AttachmentApplicant extends Model {}

AttachmentApplicant.init(
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
    modelName: 'attachmentapplicant',
  }
);
AttachmentApplicant.belongsTo(Applicant);
Applicant.hasMany(AttachmentApplicant, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = AttachmentApplicant;
