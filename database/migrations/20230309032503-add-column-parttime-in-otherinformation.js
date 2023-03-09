'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("otherinformations", "part_time_job", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("otherinformations", "about_part_time_job", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("otherinformations", "overtime", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("otherinformations", "work_on_holiday", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("otherinformations", "out_town_duty", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("otherinformations", "shifting", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("otherinformations", "giving_reference", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("otherinformations", "part_time_job"),
      queryInterface.removeColumn("otherinformations", "about_part_time_job"),
      queryInterface.removeColumn("otherinformations", "overtime"),
      queryInterface.removeColumn("otherinformations", "work_on_holiday"),
      queryInterface.removeColumn("otherinformations", "out_town_duty"),
      queryInterface.removeColumn("otherinformations", "shifting"),
      queryInterface.removeColumn("otherinformations", "giving_reference"),
    ]);
  }
};
