'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("jobs", "JobCategoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'jobCategories',
        key: 'id',
      },
      after:'package_detail'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn("jobs", "JobCategoryId");
  }
};
