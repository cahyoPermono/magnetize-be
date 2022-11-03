const express = require('express');
const OtherInformationService = require('./OtherInformationService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/otherinformations',
  check('applicantId')
    .notEmpty()
    .withMessage('Your Applicant ID cannot be null'),
  check('hospitalized')
    .notEmpty()
    .withMessage('Have you been hospitalized cannot be null'),
  check('psycological_test')
    .notEmpty()
    .withMessage('Taken psycological test cannot be null'),
  check('reason_join')
    .notEmpty()
    .withMessage('Why do you want to join cannot be null'),
  check('reason_hire')
    .notEmpty()
    .withMessage('Why we can hire you cannot be null'),
  check('opinion_teamwork')
    .notEmpty()
    .withMessage('Your opinion about teamwork cannot be null'),
  check('plan')
    .notEmpty()
    .withMessage('Short term plan and your long term plan cannot be null'),
  check('respond_target')
    .notEmpty()
    .withMessage('Respond to the target cannot be null'),
  check('respond_preasure')
    .notEmpty()
    .withMessage('Respond to pressure at work cannot be null'),
  check('reason_leave_last_company')
    .notEmpty()
    .withMessage('Why do you want to leave the last company cannot be null'),
  check('salary_expect')
    .notEmpty()
    .withMessage('Salary do you expect cannot be null'),
  check('able_to_start')
    .notEmpty()
    .withMessage('When will you be able to start to work cannot be null'),
  check('contact_emergency')
    .notEmpty()
    .withMessage('Person to contact in case of emergency cannot be null'),
  check('strength')
    .notEmpty()
    .withMessage('What do you think is your strengths cannot be null'),
  check('weakness')
    .notEmpty()
    .withMessage('What do you think is your weaknesses cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await OtherInformationService.save(req.body);
    return res.send({ message: 'Success Save Data Other Information' });
  }
);

router.get('/api/1.0/otherinformations', async (req, res) => {
  const otherinformation = await OtherInformationService.find();
  res.send({ message: 'Success Get Data Other Information', data: otherinformation });
});

router.get('/api/1.0/otherinformations/:id', async (req, res) => {
  const otherinformation = await OtherInformationService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Other Information By ID Applicant', data: otherinformation });
});


module.exports = router;
