"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("formaleducations", "location", {
        type: Sequelize.STRING,
        after: "name_location",
      }),
      queryInterface.addColumn("formaleducations", "ip_rata", {
        type: Sequelize.STRING,
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("formaleducations", "location"),
      queryInterface.removeColumn("formaleducations", "ip_rata"),
    ]);
  },
};
