'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applicants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
        type: Sequelize.DATE,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('applicants');
  },
};
