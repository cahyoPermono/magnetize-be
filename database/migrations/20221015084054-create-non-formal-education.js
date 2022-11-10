'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nonformalEducations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      applicantId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'applicants',
          key: 'id',
        },
        allowNull: false,
      },
      course: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      certificate: {
        type: Sequelize.STRING,
      },
      sponsored_by: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nonformalEducations');
  },
};
