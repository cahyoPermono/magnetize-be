const express = require("express");
const PermissionService = require("./PermissionService");
const router = express.Router();

router.post("/api/1.0/permissions", async (req, res) => {
  await PermissionService.save(req.body);
  return res.send({ message: req.t("create permission success") });
});

module.exports = router;
