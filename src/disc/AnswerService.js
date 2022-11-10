const Answer = require('./Answer');

const save = async (body) => {
  const answer = { ...body };
  await Answer.create(answer);
};

const mailExists = async (email) => {
  const answer = await Answer.findOne({ where: { email } });

  if (answer) {
    return answer;
  }

  return false;
};

const findByEmail = async (email) => {
  const answer = await Answer.findAll({ where: { email } });
  if (answer) {
    return answer
  }

  return 'tidak ada data';
}

module.exports = { save, findByEmail, mailExists};
