const User = require("./User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")

const save = async (body) => {
  const hash = await bcrypt.hash(body.password, 10);
  const user = { ...body, password: hash };
  await User.create(user);
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};

const login = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return user;
  }
  else {
    'tidak ada'
  }
};

module.exports = { save, findByEmail, login };
