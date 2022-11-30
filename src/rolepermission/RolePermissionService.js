const RolePermission = require("./RolePermission");

const save = async (body) => {
  const rolepermission = { ...body };
  await RolePermission.create(rolepermission);
};

module.exports = { save };
