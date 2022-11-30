const User = require("./User");
const Role = require('../role/Role');
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")
// const Helper = require('../utils/helper');
// const helper = new Helper();

const save = async (body) => {
  const hash = await bcrypt.hash('magnetize', 10);
  const user = { ...body, password: hash };
  await User.create(user);
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};

const find = async () => {
  const user = await User.findAll({
    include: [Role],
  });
  if (user) {
    return user;
  }
  return false;
};

const findbyId = async (id) => {
  return await User.findOne({
    where: { id: id },
    include: [Role],
  });
};

const update = async (id) => {
  await User.update({ lastActive: '' }, {
    where: { id: id }
  });
};

const login = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return user;
  } else {
    'tidak ada' 
  }
};

module.exports = { save, findByEmail, login, find, findbyId, update };
