'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
    queryInterface.addColumn("formaleducations", "location", {
      type: Sequelize.STRING,
      after: 'name_location',
    }),
    queryInterface.addColumn("formaleducations", "gpa", {
      type: Sequelize.STRING,
      after: 'location',
    }),
  ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
    queryInterface.removeColumn("formaleducations", "location"),
    queryInterface.removeColumn("formaleducations", "gpa"),
    ])
  }
};
