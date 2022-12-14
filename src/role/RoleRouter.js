const express = require("express");
const RoleService = require("./RoleService");
const router = express.Router();

router.post("/api/1.0/roles", async (req, res) => {
  await RoleService.save(req.body);
  return res.send({ message: req.t("create role success") });
});

router.get('/api/1.0/roles', async (req, res) => {
  const role = await RoleService.find();
  res.send({ message: 'Success Get Data Role', data: role });
});

router.get('/api/1.0/roles/:id', async (req, res) => {
  const role = await RoleService.findById(req.params.id);
  res.send({ message: 'Success Get Data Role', data: role });
});

module.exports = router;
