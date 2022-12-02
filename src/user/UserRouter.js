const express = require("express");
const UserService = require("./UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("./User");
const Helper = require("../utils/helper");
const helper = new Helper();
const userMiddleware = require("../middleware/middleware");

router.post(
  "/api/1.0/users",
  // check("username")
  //   .notEmpty()
  //   .withMessage("username_null")
  //   .bail()
  //   .isLength({ min: 4, max: 32 })
  //   .withMessage("username_size"),
  check("email")
    .notEmpty()
    .withMessage("email_null")
    .bail()
    .isEmail()
    .withMessage("email_invalid")
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error("email_inuse");
      }
    }),
  // check("password")
  //   .notEmpty()
  //   .withMessage("password_null")
  //   .bail()
  //   .isLength({ min: 6 })
  //   .withMessage("password_size")
  //   .bail()
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
  //   .withMessage("password_pattern"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
      return res.status(400).send({ validationErrors: validationErrors });
    }
    await UserService.save(req.body);
    return res.send({ message: req.t("user_create_success") });
  }
);

router.post("/api/1.0/login", async (req, res) => {
  const user = await UserService.login(req.body.email);
  if (user) {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      const token = jwt.sign(
        {
          email: user.email,
          password: user.password,
          roleId: user.roleId,
        },
        "SECRETKEY",
        {
          expiresIn: "2d",
        }
      );
      return res.status(200).send({
        msg: "Logged in!",
        token,
        user: user,
      });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

router.get('/api/1.0/all_users/:id', userMiddleware.isLoggedIn, async (req, res) => {
    await helper
      .checkPermission(req.params.id, "menu_users")
      .then(async (el) => {
        const user = await UserService.find();
        res.send({ message: 'Success Get Data User', data: user, el });
      })
      .catch((error) => {
        return res.send(error);
      });
});

router.get("/api/1.0/users/:id", async (req, res) => {
  const user = await UserService.findbyId(req.params.id);
  return res.send({ message: 'Success Get Data User', data: user });
});


router.put("/api/1.0/update/:id", async (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "success"
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
