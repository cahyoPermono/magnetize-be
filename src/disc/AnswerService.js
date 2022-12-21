const Answer = require('./Answer');

const save = async (body) => {
  const answer = { ...body };
  await Answer.create(answer);
};

const findByEmail = async (email) => {
  const answer = await Answer.findAll({ where: { email } });
  if (answer) {
    return answer;
  }

  return 'tidak ada data';
};

module.exports = { save, findByEmail };
