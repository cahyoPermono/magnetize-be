'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employmenthistories', {
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
      start: {
        type: Sequelize.STRING,
      },
      end: {
        type: Sequelize.STRING,
      },
      name_company: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      direct_supervisor: {
        type: Sequelize.STRING,
      },
      take_home_pay: {
        type: Sequelize.STRING,
      },
      reason_leaving: {
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
    await queryInterface.dropTable('employmenthistories');
  },
};
