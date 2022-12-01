"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("applicants", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'new'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("applicants", "status", {
      type: Sequelize.BOOLEAN,
    });
  },
};
