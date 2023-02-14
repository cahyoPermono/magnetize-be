const express = require('express');
const FormalEducationService = require('./FormalEducationService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/formaleducations',
  check('applicantId').notEmpty().withMessage('ID cannot be null'),
  check('level').notEmpty().withMessage('Level Education cannot be null'),
  check('name_location').notEmpty().withMessage('Name & Location cannot be null'),
  check('location').notEmpty().withMessage('Name & Location cannot be null'),
  check('major').notEmpty().withMessage('Major cannot be null'),
  check('entry').notEmpty().withMessage('Entry cannot be null'),
  check('graduate').notEmpty().withMessage('Graduate cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await FormalEducationService.save(req.body);
    return res.send({ message: 'Success Save Data Formal Education' });
  }
);

router.get('/api/1.0/formaleducations', async (req, res) => {
  const formaleducation = await FormalEducationService.find();
  res.send({ message: 'Success Get Data Formal Education', data: formaleducation });
});

router.get('/api/1.0/attachments/:id', async (req, res) => {
  const formaleducation = await FormalEducationService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Attachment By ID Applicant', data: formaleducation });
});


module.exports = router;
