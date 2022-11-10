const express = require('express');
const AttachmentService = require('./AttachmentService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/attachments',
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
    await AttachmentService.save(req.body);
    return res.send({ message: 'Success Save Data Attachment' });
  }
);

router.get('/api/1.0/attachments', async (req, res) => {
  const attachment = await AttachmentService.find();
  res.send({ message: 'Success Get Data Attachment', data: attachment });
});

router.get('/api/1.0/attachments/:id', async (req, res) => {
  const attachment = await AttachmentService.byIdApplicant(req.params.id);
  res.send({ message: 'Success Get Data Attachment By ID Applicant', data: attachment });
});

module.exports = router;
