'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("applicants", "ApplicantAuthId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'applicantauths',
        key: 'id',
      },
      after:'id'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn("applicants", "ApplicantAuthId");
  }
};
