'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("jobs", "DepartementId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'departements',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("jobs", "DepartementId");
  }
};
