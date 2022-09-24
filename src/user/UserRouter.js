const express = require('express');
const UserService = require('./UserService');

const router = express.Router();

const validateUsername = (req, res, next) => {
  if (!req.body.username) {
    req.validationErrors = {
      ...req.validationErrors,
      username: 'Username cannot be null',
    };
  }
  next();
};

const validateEmail = (req, res, next) => {
  if (!req.body.email) {
    req.validationErrors = {
      ...req.validationErrors,
      email: 'Email cannot be null',
    };
  }
  next();
};

router.post(
  '/api/1.0/users',
  validateUsername,
  validateEmail,
  async (req, res) => {
    if (req.validationErrors) {
      return res.status(400).send({ validationErrors: req.validationErrors });
    }
    await UserService.save(req.body);
    return res.send({ message: 'User Created' });
  }
);

module.exports = router;
