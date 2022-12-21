'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("applicants", "JobId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'jobs',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("applicants", "JobId");
  }
};
