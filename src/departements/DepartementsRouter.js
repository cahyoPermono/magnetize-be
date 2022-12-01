const express = require("express");
const DepartementsService = require("./DepartementsService");
const router = express.Router();
const userMiddleware = require("../middleware/middleware");
const Helper = require("../utils/helper");
const helper = new Helper();
const { check, validationResult } = require("express-validator");

router.post(
  "/api/1.0/departements",
  check("nama")
    .notEmpty()
    .withMessage("nama_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("nama_size"),
  check("url").notEmpty().withMessage("url_null"),
  check("industri")
    .notEmpty()
    .withMessage("industri_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("industri_size"),
  check("lokasi")
    .notEmpty()
    .withMessage("lokasi_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("lokasi_size"),
  check("alamat")
    .notEmpty()
    .withMessage("alamat_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("alamat_size"),
  userMiddleware.isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
      return res.status(400).send({ validationErrors: validationErrors });
    }
    await DepartementsService.departmentPost(req.body);
    return res.send({ message: req.t("newDeparement_create_success") });
  }
);

router.get(
  "/api/1.0/all_departements/:id",
  userMiddleware.isLoggedIn,
  async (req, res) => {
    // const departements = await DepartementsService.allDepartmentGet(req.body);
    // return res.send({ departements });
    // console.log(req)

    await helper
      .checkPermission(req.params.id, "menu_departement")
      .then(async (el) => {

        const departements = await DepartementsService.allDepartmentGet();
        return res.send({ departements, el });
      })
      .catch((error) => {
        return res.send(error);
      });
  }
);

router.get("/api/1.0/departements/:id", async (req, res) => {
  const departement = await DepartementsService.departmentGet(req.params.id);
  if (!departement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ departement });
});

router.delete("/api/1.0/departements/:id", async (req, res) => {
  const checkDdepartement = await DepartementsService.departmentGet(
    req.params.id
  );
  if (!checkDdepartement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  } else {
    await DepartementsService.departementDelete(req.params.id);
    return res.send({
      message: req.t(`departement with id ${req.params.id} deleted`),
    });
  }
});

module.exports = router;
