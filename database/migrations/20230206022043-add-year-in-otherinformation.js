"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("otherinformations", "year", {
        type: Sequelize.STRING,
        after: "disease",
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("otherinformations", "year"),
    ]);
  },
};
