const express = require('express');
const AnswerService = require('./AnswerService');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/1.0/answers',
  check('name').notEmpty().withMessage('Name cannot be null'),
  check('email')
    .notEmpty()
    .withMessage('Email cannot be null')
    .bail()
    .isEmail()
    .withMessage('Email must be valid')
    .bail()
    .custom(async (email) => {
      const mailExists = await AnswerService.mailExists(email);
      if (mailExists) {
        throw new Error('Email in use');
      }
    }),
  check('role').notEmpty().withMessage('Role cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await AnswerService.save(req.body);
    return res.send({ message: 'Answer Saved' });
  }
);

module.exports = router;
