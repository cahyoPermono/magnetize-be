'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("users", "displayName", {
        type: Sequelize.STRING,
        after: 'image',
      }),
      queryInterface.addColumn("users", "fullName", {
        type: Sequelize.STRING,
        after: 'displayName',
      }),
      queryInterface.addColumn("users", "phone", {
        type: Sequelize.STRING,
        after: 'fullName',
      }),
      queryInterface.addColumn("users", "location", {
        type: Sequelize.STRING,
        after: 'phone',
      }),
      queryInterface.addColumn("users", "status", {
        type: Sequelize.ENUM('Active', 'Not Active'),
        defaultValue: "Active",
        after: 'location',
      }),
      queryInterface.addColumn("users", "lastActive", {
        type: Sequelize.DATE,
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("users", "displayName"),
      queryInterface.removeColumn("users", "fullName"),
      queryInterface.removeColumn("users", "status"),
      queryInterface.removeColumn("users", "phone"),
      queryInterface.removeColumn("users", "location"),
      queryInterface.removeColumn("users", "lastActive"),
    ]);
  },
};
