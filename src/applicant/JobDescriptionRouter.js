const express = require('express');
const JobDescriptionService = require('./JobDescriptionService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/jobdescriptions',
  check('applicantId').notEmpty().withMessage('ID Applicant cannot be null'),
  check('description').notEmpty().withMessage('Description cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await JobDescriptionService.save(req.body);
    return res.send({ message: 'Success Save Data Job Description' });
  }
);

router.get('/api/1.0/jobdescriptions', async (req, res) => {
  const jobdescription = await JobDescriptionService.find();
  res.send({ message: 'Success Get Job Description', data: jobdescription });
});

router.get('/api/1.0/jobdescriptions/:id', async (req, res) => {
  const jobdescription = await JobDescriptionService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Job Description By ID Applicant', data: jobdescription });
});


module.exports = router;
