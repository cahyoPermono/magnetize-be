'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('families', {
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
      // marital_status: {
      //   type: Sequelize.STRING,
      // },
      member: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('L', 'P'),
      },
      date: {
        type: Sequelize.DATE,
      },
      education: {
        type: Sequelize.STRING,
      },
      occupation_company: {
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
    await queryInterface.dropTable('families');
  },
};
