'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("attachments", "attachment_file", {
      type: Sequelize.TEXT
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("attachments", "attachment_file", {
      type: Sequelize.BLOB('medium'),
    });
  }
};
