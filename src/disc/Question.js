const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class Question extends Model {}

Question.init(
  {
    question: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'question',
  }
);

module.exports = Question;
