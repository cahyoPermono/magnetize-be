const Answer = require('./Answer');

const save = async (body) => {
  const answer = { ...body };
  await Answer.create(answer);
};

const mailExists = async (email) => {
  const answer = await Answer.findOne({ where: { email } });

  if (answer) {
    return true;
  }

  return false;
};

module.exports = { save, mailExists };
