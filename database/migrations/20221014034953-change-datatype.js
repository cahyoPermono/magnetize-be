"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("departements", "deskripsi", {
      type: Sequelize.TEXT,
    });

    await queryInterface.renameColumn("attachments", "url", "attachment_file");

    await queryInterface.changeColumn("attachments", "attachment_file", {
      type: Sequelize.BLOB('medium'),
    });

    await queryInterface.changeColumn("notes", "notes", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("departements", "deskripsi", {
      type: Sequelize.STRING,
    });

    await queryInterface.renameColumn("attachments", "attachment_file", "url");

    await queryInterface.changeColumn("attachments", "url", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("notes", "notes", {
      type: Sequelize.STRING,
    });
  },
};
