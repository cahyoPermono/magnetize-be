"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("guests", "posisi", {
        type: Sequelize.STRING,
        after: 'email',
      }),
      queryInterface.addColumn("guests", "cv", {
        type: Sequelize.TEXT('long'),
        after: 'posisi',
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("guests", "posisi"),
      queryInterface.removeColumn("guests", "cv"),
    ]);
  },
};
