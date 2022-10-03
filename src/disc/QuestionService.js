const Question = require('./Question');

const save = async (body) => {
  const question = { ...body };
  await Question.create(question);
};

const find = async() => {
  const question = await Question.findAll({})
  if (question) {
    return question;
  }

  return false;
}

module.exports = { save, find };
