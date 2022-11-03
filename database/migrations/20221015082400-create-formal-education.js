'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formalEducations', {
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
      level: {
        type: Sequelize.STRING,
      },
      name_location: {
        type: Sequelize.STRING,
      },
      major: {
        type: Sequelize.STRING,
      },
      entry: {
        type: Sequelize.STRING,
      },
      graduate: {
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
    await queryInterface.dropTable('formalEducations');
  },
};
