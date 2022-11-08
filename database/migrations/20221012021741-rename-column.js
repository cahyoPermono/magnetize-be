"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("departements", "id", {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("departements", "id", {
      autoIncrement: false,
      type: Sequelize.STRING,
    });  },
};
