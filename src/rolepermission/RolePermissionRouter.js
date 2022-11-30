const express = require("express");
const RolePermissionService = require("./RolePermissionService");
const router = express.Router();

router.post("/api/1.0/rolepermissions", async (req, res) => {
  await RolePermissionService.save(req.body);
  return res.send({ message: req.t("create role permission success") });
});

module.exports = router;
