"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("applicants", "photo", {
      type: Sequelize.TEXT('long'),
    });

    await queryInterface.changeColumn("applicants", "valid_to", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("nonformaleducations", "certificate", {
      type: Sequelize.TEXT('long'),
    });

    await queryInterface.changeColumn("attachmentapplicants", "file", {
      type: Sequelize.TEXT('long'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("applicants", "photo", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("applicants", "valid_to", {
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn("nonformaleducations", "certificate", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("attachmentapplicants", "file", {
      type: Sequelize.STRING,
    });
  },
};
