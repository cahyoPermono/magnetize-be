const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class Applicant extends Model {}

Applicant.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.ENUM('L', 'P'),
    },
    place_of_birth: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    blood_type: {
      type: Sequelize.ENUM('A', 'B', 'AB', 'O'),
    },
    address: {
      type: Sequelize.STRING,
    },
    postal_code_address: {
      type: Sequelize.INTEGER,
    },
    domicile: {
      type: Sequelize.STRING,
    },
    postal_code_domicile: {
      type: Sequelize.INTEGER,
    },
    phone: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    office_parent_phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    id_sim_no: {
      type: Sequelize.STRING,
    },
    valid_to: {
      type: Sequelize.STRING,
    },
    npwp_no: {
      type: Sequelize.STRING,
    },
    account_no: {
      type: Sequelize.STRING,
    },
    religion: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    marital_status: {
      type: Sequelize.STRING,
    },
    year_marriage: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    isCandidate: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'applicant',
  }
);

module.exports = Applicant;
