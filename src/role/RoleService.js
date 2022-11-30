const Role = require("./Role");

const save = async (body) => {
  const role = { ...body };
  await Role.create(role);
};

const find = async () => {
  const role = await Role.findAll();
  if (role) {
    return role;
  }
  return false;
};

module.exports = { save, find };
