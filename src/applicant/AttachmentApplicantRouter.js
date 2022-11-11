const express = require('express');
const AttachmentApplicantService = require('./AttachmentApplicantService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/attachmentapplicants',
  check('applicantId').notEmpty().withMessage('ID cannot be null'),
  check('type').notEmpty().withMessage('Type cannot be null'),
  check('file').notEmpty().withMessage('File cannot be null'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }
    await AttachmentApplicantService.save(req.body);
    return res.send({ message: 'Success Save Data Attachment' });
  }
);

router.get('/api/1.0/attachmentapplicants', async (req, res) => {
  const attachmentapplicant = await AttachmentApplicantService.find();
  res.send({ message: 'Success Get Data Attachment', data: attachmentapplicant });
});

router.get('/api/1.0/attachmentapplicants/:id', async (req, res) => {
  const attachmentapplicant = await AttachmentApplicantService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Attachment By ID Applicant', data: attachmentapplicant });
});

module.exports = router;
