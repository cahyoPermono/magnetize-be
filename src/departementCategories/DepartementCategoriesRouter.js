const express = require("express");
const DepartementCategoriesService = require("./DepartementCategoriesService");
const router = express.Router();
const userMiddleware = require("../middleware/middleware");
const Helper = require("../utils/helper");
const helper = new Helper();
const { check, validationResult } = require("express-validator");

// POST /api/1.0/departementcategories
router.post(
  "/api/1.0/departementcategories",
  check("category")
    .notEmpty()
    .withMessage("category_null"),
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
    await DepartementCategoriesService.departementCategoriesPost(req.body);
    return res.send({ message: req.t("newDeparement_create_success") });
  }
);

// GET /api/1.0/all_departementcategories/:id => get all
router.get(
  "/api/1.0/all_departementcategories/:id",
  userMiddleware.isLoggedIn,
  async (req, res) => {
    await helper
      .checkPermission(req.params.id, "menu_departements")
      .then(async (el) => {
        const departements = await DepartementCategoriesService.allDepartementCategoriesGet();
        return res.send({ departements, el });
      })
      .catch((error) => {
        return res.send(error);
      });
  }
);

// GET /api/1.0/departementcategories/:id => get one
router.get("/api/1.0/departementcategories/:id", async (req, res) => {
  const departement = await DepartementCategoriesService.departementCategoriesGet(req.params.id);
  if (!departement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ departement });
});

//DEL /api/1.0/departementcategories/:id
router.delete("/api/1.0/departementcategories/:id", async (req, res) => {
  const checkDdepartement = await DepartementCategoriesService.departementCategoriesGet(
    req.params.id
  );
  if (!checkDdepartement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  } else {
    await DepartementCategoriesService.departementCategoriesDelete(req.params.id);
    return res.send({
      message: req.t(`departement with id ${req.params.id} deleted`),
    });
  }
});

module.exports = router;