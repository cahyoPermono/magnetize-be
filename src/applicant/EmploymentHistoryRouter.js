const express = require('express');
const EmploymentHistoryService = require('./EmploymentHistoryService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/employmenthistories',
  check('applicantId').notEmpty().withMessage('ID Applicant cannot be null'),
  check('start').notEmpty().withMessage('Start cannot be null'),
  check('end').notEmpty().withMessage('End cannot be null'),
  check('name_company').notEmpty().withMessage('Name of Company cannot be null'),
  check('position').notEmpty().withMessage('Position cannot be null'),
  check('direct_supervisor').notEmpty().withMessage('Direct Supervisor cannot be null'),
  check('take_home_pay').notEmpty().withMessage('Take Home Pay cannot be null'),
  check('reason_leaving').notEmpty().withMessage('Reason for Leaving cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await EmploymentHistoryService.save(req.body);
    return res.send({ message: 'Success Save Data Employment History' });
  }
);

router.get('/api/1.0/employmenthistories', async (req, res) => {
  const employmenthistory = await EmploymentHistoryService.find();
  res.send({ message: 'Success Get Data Employment History', data: employmenthistory });
});

router.get('/api/1.0/employmenthistories/:id', async (req, res) => {
  const employmenthistory = await EmploymentHistoryService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Employment History By ID Applicant', data: employmenthistory });
});

module.exports = router;
