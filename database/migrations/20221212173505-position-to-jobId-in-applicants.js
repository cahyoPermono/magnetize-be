'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('applicants', 'position');;
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn("applicants", "position", {
      type: Sequelize.STRING,
      after: 'religion',
    });
  }
};
