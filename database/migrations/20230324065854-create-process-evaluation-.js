'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("processevaluations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      interview_1: {
        type: Sequelize.STRING,
      },
      interview_2: {
        type: Sequelize.STRING,
      },
      interview_3: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.TEXT('medium'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("processevaluations");
  }
};
