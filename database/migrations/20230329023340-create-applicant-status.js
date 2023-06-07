'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applicantstatus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      }
    });
    await queryInterface.addColumn("applicants", "ApplicantStatusId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'applicantstatus',
        key: 'id',
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("applicantstatus");
    await queryInterface.removeColumn("applicants", "ApplicantStatusId");
  }
};
