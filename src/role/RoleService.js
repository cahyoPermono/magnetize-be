const Permission = require("../permission/Permission");
const Role = require("./Role");

const save = async (body) => {
  const role = { ...body };
  await Role.create(role);
};

const find = async () => {
  const role = await Role.findAll({
    include: [Permission]
  });
  if (role) {
    return role;
  }
  return false;
};

module.exports = { save, find };
