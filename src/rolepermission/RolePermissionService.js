const Permission = require("../permission/Permission");
const Role = require("../role/Role");
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

const all = async () => {
  const permissions = await RolePermission.findAll({
    include: [Role, Permission],
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

const deleterolePermission = async (id) => {
  const rolepermission = await RolePermission.destroy({
    where: { roleId: id },
  });
}

module.exports = { save, byroleId, bypermission, all, deleterolePermission };
