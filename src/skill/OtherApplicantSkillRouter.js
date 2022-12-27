const express = require('express');
const OtherApplicantSkillService = require('./OtherApplicantSkillService');
const router = express.Router();

router.post(
  '/api/1.0/otherapplicantskills',
  async (req, res) => {
    await OtherApplicantSkillService.save(req.body);
    return res.send({ message: 'Success Save Other Skill' });
  }
);

router.get('/api/1.0/otherapplicantSkills', async (req, res) => {
  const otherapplicantskill = await OtherApplicantSkillService.find();
  res.send({ message: 'Success Get Other Skill', data: otherapplicantskill });
});

router.get('/api/1.0/otherapplicantskills/:id', async (req, res) => {
  const otherapplicantskill = await OtherApplicantSkillService.findByIdApplicant(req.params.id);
  res.send({ message: 'Success Get Other Skill', data: otherapplicantskill });
});

module.exports = router;
