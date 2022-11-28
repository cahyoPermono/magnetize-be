'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('jobs', 'location', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'remote', {
          type: Sequelize.BOOLEAN,
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'headcount', {
          type: Sequelize.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'contract_detail', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'min_salary', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'max_salary', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'desc', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('jobs', 'creator_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        }, { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('jobs', 'location', { transaction: t }),
          queryInterface.removeColumn('jobs', 'remote', { transaction: t }),
          queryInterface.removeColumn('jobs', 'headcount', { transaction: t }),
          queryInterface.removeColumn('jobs', 'contract_detail', { transaction: t }),
          queryInterface.removeColumn('jobs', 'min_salary', { transaction: t }),
          queryInterface.removeColumn('jobs', 'max_salary', { transaction: t }),
          queryInterface.removeColumn('jobs', 'creator_id', { transaction: t }),
      ])
  })
  }
};
