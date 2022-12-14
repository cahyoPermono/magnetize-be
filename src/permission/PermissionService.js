const Role = require("../role/Role");
const Permission = require("./Permission");

const save = async (body) => {
  const permission = { ...body };
  await Permission.create(permission);
};

const find = async () => {
  const permission = await Permission.findAll({
    include: [Role],
  });
  if (permission) {
    return permission;
  }
  return false;
};

const getOne = async (permission) => {
  const perm = await Permission.findOne({
    where: { permission: permission },
  });
  if (perm) {
    return perm;
  }
  return false;
};

module.exports = { save, find, getOne };
