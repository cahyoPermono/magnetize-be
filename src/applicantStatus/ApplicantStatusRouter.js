const express = require("express");
const ApplicantStatusService = require("./ApplicantStatusService");
const router = express.Router();
const userMiddleware = require("../middleware/middleware");
const Helper = require("../utils/helper");
const helper = new Helper();
const { check, validationResult } = require("express-validator");

router.post(
    "/api/1.0/applicantstatus",
    check("status").notEmpty().withMessage("status cannot null"),
    userMiddleware.isLoggedIn,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const validationErrors = {};
                errors
                    .array()
                    .forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
                return res.status(400).send({ validationErrors: validationErrors });
            }
            await ApplicantStatusService.applicantStatusPost(req.body);
            return res.status(200).send({ message: req.t("applicantStatus_create_success") });
        } catch (error) {
            console.log(error)
            return res.status(200).send({ error: error });
        }

    }
);

router.get("/api/1.0/applicantstatus", userMiddleware.isLoggedIn, async (req, res) => {
    const data = await ApplicantStatusService.allApplicantGet();
    return res.status(200).send({ data });
});

router.get("/api/1.0/applicantstatus/:id", async (req, res) => {
    const data = await ApplicantStatusService.applicantStatusGet(req.params.id);
    if (!data) {
        return res.status(400).send({
            message: req.t(`no data with id ${req.params.id} exist!`),
        });
    }
    return res.status(200).send({ data });
});

router.put("/api/1.0/applicantstatus/:id", userMiddleware.isLoggedIn, async (req, res) => {
    await ApplicantStatusService.applicantStatusUpdate(req.body, req.params.id);
    return res.status(200).send({ message: `status ke-${req.params.id} telah di update` });
});

router.delete("/api/1.0/applicantstatus/:id", async (req, res) => {
    const data = await ApplicantStatusService.applicantStatusGet(req.params.id);
    if (!data) {
        return res.status(400).send({
            message: req.t(`no data with id ${req.params.id} exist!`),
        });
    } else {
        await ApplicantStatusService.applicantStatusDelete(req.params.id);
        return res.status(200).send({
            message: req.t(`departement with id ${req.params.id} deleted`),
        });
    }
});

module.exports = router;
