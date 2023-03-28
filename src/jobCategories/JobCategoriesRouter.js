const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/middleware");
const Helper = require("../utils/helper");
const helper = new Helper();
const { check, validationResult } = require("express-validator");
const JobCategoriesService = require("./JobCategoriesService");

// POST /api/1.0/jobcategories
router.post(
  "/api/1.0/jobcategories",
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
    await JobCategoriesService.JobCategoriesPost(req.body);
    return res.send({ message: req.t("new job categories success created") });
  }
);

// GET /api/1.0/all_jobcategories => get all
router.get("/api/1.0/all_jobcategories", userMiddleware.isLoggedIn, async (req, res) => {
  try {
    const categories = await JobCategoriesService.allJobCategoriesGet();
    return res.status(200).send({ categories });
  } catch (error) {
    return res.status(400).send(error);
  }
}
);

// GET /api/1.0/jobcategories/:id => get one
router.get("/api/1.0/jobcategories/:id", async (req, res) => {
  const category = await JobCategoriesService.JobCategoriesGet(req.params.id);
  if (!category) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ category });
});

//DEL /api/1.0/jobcategories/:id
router.delete("/api/1.0/jobcategories/:id", async (req, res) => {
  const checkDdepartement = await JobCategoriesService.JobCategoriesGet(
    req.params.id
  );
  if (!checkDdepartement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  } else {
    await JobCategoriesService.JobCategoriesDelete(req.params.id);
    return res.send({
      message: req.t(`job Category with id ${req.params.id} deleted`),
    });
  }
});

module.exports = router;