const express = require("express");
const RolePermissionService = require("./RolePermissionService");
const router = express.Router();

router.post("/api/1.0/rolepermissions", async (req, res) => {
  // for (let index = 0; index < req.body.rolepermission.length; index++) {
  //   await RolePermissionService.save(req.body.rolepermission[index]);
  // }
  await RolePermissionService.save(req.body);
  return res.send({ message: ("create role permission success") });
});

router.get("/api/1.0/all_rolepermissions", async (req, res) => {
  const rolepermission = await RolePermissionService.all();
  return res.send({ message: 'Success Get Role Permission', data: rolepermission });
});

router.get("/api/1.0/rolepermissions/:id", async (req, res) => {
  const rolepermission = await RolePermissionService.byroleId(req.params.id);
  return res.send({ message: 'Success Get Role Permission', data: rolepermission });
});

router.get("/api/1.0/permission/:id", async (req, res) => {
  const rolepermission = await RolePermissionService.bypermission(req.params.id);
  return res.send({ message: 'Success Get Role Permission', data: rolepermission });
});

router.delete("/api/1.0/rolepermissions/:id", async (req, res) => {
  const checkRolePermssion = await RolePermissionService.byroleId(
    req.params.id
  );
  if (!checkRolePermssion) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  } else {
    await RolePermissionService.deleterolePermission(req.params.id);
    return res.send({
      message: req.t(`departement with id ${req.params.id} deleted`),
    });
  }
});

module.exports = router;
