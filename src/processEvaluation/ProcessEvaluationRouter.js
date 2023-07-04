const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");
const ProcessEvaluationService = require("./ProcessEvaluationService");
const ApplicantService = require("../applicant/ApplicantService");

// POST /api/1.0/ProcessEvaluation
router.post(
    "/api/1.0/processevaluation",
    check("applicantId").notEmpty().withMessage("ApplicantId cannot be null"),
    check('interview_1').notEmpty().withMessage('interview_1 cannot be null'),
    check('interview_2').notEmpty().withMessage('interview_2 cannot be null'),
    check('interview_3').notEmpty().withMessage('interview_3 cannot be null'),
    userMiddleware.isLoggedIn,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const validationErrors = {};
                errors.array().forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
                return res.status(400).send({ message: validationErrors });
            }
            await ProcessEvaluationService.ProcessEvaluationPost(req.body);
            await ApplicantService.update2({ status: req.body.status, ApplicantStatusId: 8 },  req.body.applicantId );
            return res.status(200).send({ message: req.t("process evaluation saved !") });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ message: error });
        }
    }
);

// GET /api/1.0/proccessevaluation => get all
router.get("/api/1.0/proccessevaluation", userMiddleware.isLoggedIn, async (req, res) => {
    try {
        const data = await ProcessEvaluationService.allProcessEvaluationGet();
        return res.status(200).send({ data });
    } catch (error) {
        return res.status(400).send(error);
    }
}
);

// GET /api/1.0/proccessevaluation/:id => get one
router.get("/api/1.0/proccessevaluation/:id", async (req, res) => {
    const data = await ProcessEvaluationService.ProcessEvaluationGet(req.params.id);
    if (!data) {
        return res.status(400).send({
            message: req.t(`no data with id ${req.params.id} exist!`),
        });
    }
    return res.status(200).send({ data });
});

//DEL /api/1.0/proccessevaluation/:id
router.delete("/api/1.0/proccessevaluation/:id", async (req, res) => {
    const checkData = await ProcessEvaluationService.ProcessEvaluationGet(req.params.id);
    if (!checkData) {
        return res.status(400).send({
            message: req.t(`no data with id ${req.params.id} exist!`),
        });
    } else {
        await ProcessEvaluationService.ProcessEvaluationDelete(req.params.id);
        return res.status(200).send({
            message: req.t(`process evaluation data with id ${req.params.id} deleted`),
        });
    }
});

module.exports = router;