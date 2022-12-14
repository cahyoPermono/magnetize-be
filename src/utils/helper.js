const RolePermission = require('../rolepermission/RolePermission');
const Permission = require('../permission/Permission');

class Helper {
  constructor() {}

  checkPermission(roleId, permission) {
    return new Promise((resolve, reject) => {
      Permission.findOne({
        where: {
          permission: permission,
        },
      })
        .then((perm) => {
          RolePermission.findOne({
            where: {
              roleId: roleId,
              permissionId: perm.id,
            },
          })
            .then((rolePermission) => {
              // console.log(rolePermission);
              if (rolePermission) {
                resolve(rolePermission);
              } else {
                reject({ message: "Forbidden" });
              }
            })
            .catch((error) => {
              reject({ message: error });
            });
        })
        .catch(() => {
          reject({ message: "Forbidden" });
        });
    });
  }
}

module.exports = Helper;
