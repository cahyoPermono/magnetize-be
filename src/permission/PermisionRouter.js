const express = require("express");
const PermissionService = require("./PermissionService");
const router = express.Router();

router.post("/api/1.0/permissions", async (req, res) => {
  await PermissionService.save(req.body);
  return res.send({ message: req.t("create permission success") });
});

router.get('/api/1.0/permissions', async (req, res) => {
  const permission = await PermissionService.find();
  res.send({ message: 'Success Get Permission', data: permission });
});

router.get('/api/1.0/permissions/:permission', async (req, res) => {
  const permission = await PermissionService.getOne(req.params.permission);
  res.send({ permission });
});

module.exports = router;
