'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otherinformations', {
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
      hospitalized: {
        type: Sequelize.STRING,
      },
      disease: {
        type: Sequelize.STRING,
      },
      psycological_test: {
        type: Sequelize.STRING,
      },
      experience_tellecomunication: {
        type: Sequelize.STRING,
      },
      experience_it: {
        type: Sequelize.STRING,
      },
      reason_join: {
        type: Sequelize.STRING,
      },
      reason_hire: {
        type: Sequelize.STRING,
      },
      opinion_teamwork: {
        type: Sequelize.STRING,
      },
      plan: {
        type: Sequelize.STRING,
      },
      respond_target: {
        type: Sequelize.STRING,
      },
      respond_preasure: {
        type: Sequelize.STRING,
      },
      reason_leave_last_company: {
        type: Sequelize.STRING,
      },
      salary_expect: {
        type: Sequelize.STRING,
      },
      able_to_start: {
        type: Sequelize.STRING,
      },
      contact_emergency: {
        type: Sequelize.STRING,
      },
      relatives_in_ip: {
        type: Sequelize.STRING,
      },
      strength: {
        type: Sequelize.STRING,
      },
      weakness: {
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
    await queryInterface.dropTable('otherinformations');
  },
};
