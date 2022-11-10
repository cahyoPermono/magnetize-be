const express = require('express');
const FamilyService = require('./FamilyService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/families',
  check('applicantId').notEmpty().withMessage('ID cannot be null'),
  check('member').notEmpty().withMessage('Member cannot be null'),
  check('name').notEmpty().withMessage('Name cannot be null'),
  check('gender').notEmpty().withMessage('Gender cannot be null'),
  check('date').notEmpty().withMessage('Date cannot be null'),
  check('education').notEmpty().withMessage('Education cannot be null'),
  check('occupation_company').notEmpty().withMessage('Occupation & Company cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await FamilyService.save(req.body);
    return res.send({ message: 'Success Save Data Family' });
  }
);

router.get('/api/1.0/families', async (req, res) => {
  const family = await FamilyService.find();
  res.send({ message: 'Success Get Data Attachment', data: family });
});

router.get('/api/1.0/families/:id', async (req, res) => {
  const family = await FamilyService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Attachment By ID Applicant', data: family });
});

module.exports = router;
