const User = require('./User');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const save = async (body) => {
  const hash = await bcrypt.hash(body.password, saltRounds);
  // Store hash in your password DB.
  const user = { ...body, password: hash };
  await User.create(user);
};

const isEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return true;
  }

  return false;
};
module.exports = { save, isEmailExists };
