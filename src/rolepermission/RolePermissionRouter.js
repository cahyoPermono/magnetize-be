const express = require("express");
const RolePermissionService = require("./RolePermissionService");
const router = express.Router();

router.post("/api/1.0/rolepermissions", async (req, res) => {
  await RolePermissionService.save(req.body);
  return res.send({ message: ("create role permission success") });
});

router.get("/api/1.0/rolepermissions/:id", async (req, res) => {
  const rolepermission = await RolePermissionService.byroleId(req.params.id);
  return res.send({ message: 'Success Get Role Permission', data: rolepermission });
});

router.get("/api/1.0/permission/:id", async (req, res) => {
  const rolepermission = await RolePermissionService.bypermission(req.params.id);
  return res.send({ message: 'Success Get Role Permission', data: rolepermission });
});

module.exports = router;
