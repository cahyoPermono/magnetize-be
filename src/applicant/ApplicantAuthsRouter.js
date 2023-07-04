const express = require("express");
const ApplicantAuthsService = require("./ApplicantAuthsService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Helper = require("../utils/helper");
const helper = new Helper();
const userMiddleware = require("../middleware/middleware");
const nodemailer = require("nodemailer");
const email = require('../config/emailReceiver');

//Register Applicant Auth
router.post(
    "/api/1.0/applicant_auth/register",
    check("email")
        .notEmpty()
        .withMessage("email_null")
        .bail()
        .isEmail()
        .withMessage("email_invalid")
        .bail()
        .custom(async (email) => {
            const user = await ApplicantAuthsService.findByEmail(email);
            if (user) {
                throw new Error("email sudah digunakan");
            }
        }),
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
            const transporter = nodemailer.createTransport(email.sender);
            const text = `<p><b>Dear HR Imani Prima,</b> <br><br>Diinformasikan bahwa ada pelamar baru yang melakukan registrasi dan belum mengisi formulir, yaitu: <br> Nama: ${req.body.name} <br>Email: ${req.body.email} <br><br>Terima Kasih</p>`;
            const subject = `Registrasi Pelamar Baru (${req.body.name} - ${req.body.email})`
            const mail = {
                from: email.sender.auth.user,
                to: email.receiver,
                subject: subject,
                html: text,
            }
            transporter.sendMail(mail, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("email send");
                }
            });
            await ApplicantAuthsService.save(req.body);
            return res.status(200).send({ message: req.t("applicant berhasil melakukan register, notifikasi telah dikirim ke HRD") });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
    }
);

//Login Applicant Auth
router.post("/api/1.0/applicant_auth/login", async (req, res) => {
    try {
        const user = await ApplicantAuthsService.login(req.body.email);
        if (user) {
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (validPassword) {
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    },
                    "SECRETKEY",
                    {
                        expiresIn: "2d",
                    }
                );
                return res.status(200).send({
                    message: "Logged in!",
                    token,
                    user: user,
                });
            } else {
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

router.get('/api/1.0/applicant_auth/:id', userMiddleware.isLoggedIn, async (req, res) => {
    const user = await ApplicantAuthsService.ApplicantAuthGet(req.params.id);
    res.send({ message: 'Success Get Data User', data: user });
});
module.exports = router;