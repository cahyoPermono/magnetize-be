const express = require('express');
const SubSkillService = require('./SubSkillService');
const router = express.Router();

router.post(
  '/api/1.0/subskills',
  async (req, res) => {
    await SubSkillService.save(req.body);
    return res.send({ message: 'Success Save Sub Skill' });
  }
);

router.get('/api/1.0/subskills', async (req, res) => {
  const subskill = await SubSkillService.find();
  res.send({ message: 'Success Get Sub Skill', data: subskill });
});

router.get('/api/1.0/subskills/:skillId', async (req, res) => {
  const skill = await SubSkillService.findbyIdSkill(req.params.skillId);
  res.send({ message: 'Success Get', data: skill });
});

module.exports = router;
