'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("departements", "avatar", {
      type: Sequelize.TEXT('medium')
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("departements", "avatar", {
      type: Sequelize.STRING
    });
  }
};
