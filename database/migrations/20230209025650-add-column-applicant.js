'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("applicants", "province", {
        type: Sequelize.STRING,
        after: 'blood_type',
      }),
      queryInterface.addColumn("applicants", "city", {
        type: Sequelize.STRING,
        after: 'province',
      }),
      queryInterface.addColumn("applicants", "district", {
        type: Sequelize.STRING,
        after: 'city',
      }),
      queryInterface.addColumn("applicants", "subdistrict", {
        type: Sequelize.STRING,
        after: 'district',
      }),
      queryInterface.addColumn("applicants", "province_dom", {
        type: Sequelize.STRING,
        after: 'postal_code_address',
      }),
      queryInterface.addColumn("applicants", "city_dom", {
        type: Sequelize.STRING,
        after: 'province_dom',
      }),
      queryInterface.addColumn("applicants", "district_dom", {
        type: Sequelize.STRING,
        after: 'city_dom',
      }),
      queryInterface.addColumn("applicants", "subdistrict_dom", {
        type: Sequelize.STRING,
        after: 'district_dom',
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("applicants", "province"),
      queryInterface.removeColumn("applicants", "city"),
      queryInterface.removeColumn("applicants", "district"),
      queryInterface.removeColumn("applicants", "subdistrict"),
      queryInterface.removeColumn("applicants", "province_dom"),
      queryInterface.removeColumn("applicants", "city_dom"),
      queryInterface.removeColumn("applicants", "district_dom"),
      queryInterface.removeColumn("applicants", "subdistrict_dom"),
    ]);
  }
};
