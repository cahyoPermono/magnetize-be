const express = require('express');
const AnswerService = require('./AnswerService');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/api/1.0/answers',
  check('name')
    .notEmpty()
    .withMessage('Name cannot be null'),
  check('email')
    .notEmpty()
    .withMessage('Email cannot be null')
    .bail()
    .isEmail()
    .withMessage('Email must be valid'),
  check('role')
    .notEmpty()
    .withMessage('Role cannot be null'),
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

// router.get(
//   '/api/1.0/answers/:email',
//   async (email) => {
//       const answerByEmail = await AnswerService.mailExists(email);
//       res.send({ message: 'Success Get Question', data: answerByEmail });
//   }
  
// );

router.get(
  '/api/1.0/answers/:email',
  async (req, res) => {
    const email = req.params.email
    const answer = await AnswerService.findByEmail(email);
      res.send({ message: 'Success Get Answer', data: answer });
  }
  
);

module.exports = router;
