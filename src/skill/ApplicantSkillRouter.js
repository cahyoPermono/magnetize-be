const express = require('express');
const ApplicantSkillService = require('./ApplicantSkillService');
const router = express.Router();

router.post(
  '/api/1.0/applicantskills',
  async (req, res) => {
  for (let index = 0; index < req.body.applicantskill.length; index++) {
    await ApplicantSkillService.save(req.body.applicantskill[index]);
  }
    return res.send({ message: 'Success Save Skill' });
  }
);


router.get('/api/1.0/applicantskills', async (req, res) => {
  const applicantskill = await ApplicantSkillService.find();
  res.send({ message: 'Success Get skill', data: applicantskill });
});

module.exports = router;
