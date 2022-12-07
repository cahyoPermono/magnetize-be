const Permission = require("../permission/Permission");
const RolePermission = require("./RolePermission");

const save = async (body) => {
  const rolepermission = { ...body };
  await RolePermission.create(rolepermission);
};

const byroleId = async (roleId) => {
  const permissions = await RolePermission.findAll({
    where: { roleId: roleId },
    include: [Permission],
  });
  return permissions;
};

const bypermission = async (permissionId) => {
  const permissions = await RolePermission.findAll({
    where: { permissionId: permissionId },
    include: [Permission],
  });
  return permissions;
};

module.exports = { save, byroleId, bypermission };
