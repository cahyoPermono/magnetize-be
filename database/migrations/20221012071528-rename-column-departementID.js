'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("notes", "departement_id", "DepartementId");

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("notes", "DepartementId", "departement_id");
  }
};
