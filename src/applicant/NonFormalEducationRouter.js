const express = require('express');
const NonFormalEducationService = require('./NonFormalEducationService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/nonformaleducations',
  check('applicantId').notEmpty().withMessage('ID Applicant cannot be null'),
  check('course').notEmpty().withMessage('Course cannot be null'),
  check('year').notEmpty().withMessage('Year cannot be null'),
  check('duration').notEmpty().withMessage('Duration cannot be null'),
  check('certificate').notEmpty().withMessage('Certificate cannot be null'),
  check('sponsored_by').notEmpty().withMessage('Sponsored by cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await NonFormalEducationService.save(req.body);
    return res.send({ message: 'Success Save Data Non Formal Education' });
  }
);

router.get('/api/1.0/nonformaleducations', async (req, res) => {
  const nonformaleducation = await NonFormalEducationService.find();
  res.send({ message: 'Success Get Data Non Formal Education', data: nonformaleducation });
});

router.get('/api/1.0/nonformaleducations/:id', async (req, res) => {
  const nonformaleducation = await NonFormalEducationService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Noon Formal Education By ID Applicant', data: nonformaleducation });
});

module.exports = router;
