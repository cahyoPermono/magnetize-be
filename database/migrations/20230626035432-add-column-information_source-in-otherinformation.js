'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    queryInterface.addColumn("otherinformations", "information_source", {
      type: Sequelize.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("otherinformations", "information_source")
  }
};
