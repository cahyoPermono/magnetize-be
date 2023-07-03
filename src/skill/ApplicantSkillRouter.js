const express = require('express');
const ApplicantSkillService = require('./ApplicantSkillService');
const router = express.Router();

router.post('/api/1.0/applicantskills', async (req, res) => {
  try {
    await ApplicantSkillService.save(req.body);
    return res.send({ message: 'Success Save Skill' });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

router.get('/api/1.0/applicantskills', async (req, res) => {
  const applicantskill = await ApplicantSkillService.find();
  res.send({ message: 'Success Get skill', data: applicantskill });
});

router.get('/api/1.0/applicantskills/:id', async (req, res) => {
  const applicantskill = await ApplicantSkillService.findByIdApplicant(req.params.id);
  res.send({ message: 'Success Get skill', data: applicantskill });
});

module.exports = router;
