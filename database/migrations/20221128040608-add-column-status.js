'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("applicants", "status", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("applicants", "status");
  },
};
