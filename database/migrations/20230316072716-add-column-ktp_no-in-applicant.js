'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("applicants", "ktp_no", {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn("applicants", "id_sim_no"),
      queryInterface.removeColumn("applicants", "valid_to"),
    ])
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn("applicants", "ktp_no"),
      queryInterface.addColumn("applicants", "id_sim_no", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("applicants", "valid_to", {
        type: Sequelize.STRING,
      }),
    ])
  }
};
