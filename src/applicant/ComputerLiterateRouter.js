const express = require('express');
const ComputerLiterateService = require('./ComputerLiterateService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/computerliterates',
  check('applicantId').notEmpty().withMessage('ID Applicant cannot be null'),
  check('skill').notEmpty().withMessage('Skill cannot be null'),
  check('level').notEmpty().withMessage('Level cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await ComputerLiterateService.save(req.body);
    return res.send({ message: 'Success Save Data Computer Literate' });
  }
);

router.get('/api/1.0/computerliterates', async (req, res) => {
  const computerliterate = await ComputerLiterateService.find();
  res.send({ message: 'Success Get Data Computer Literate', data: computerliterate });
});

router.get('/api/1.0/computerliterates/:id', async (req, res) => {
  const computerliterate = await ComputerLiterateService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Computer Literate By ID Applicant', data: computerliterate });
});

module.exports = router;
