'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("departements", "DepartementCategoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'departementCategories',
        key: 'id',
      },
      after:'deskripsi'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn("departements", "DepartementCategoryId");
  }
};
