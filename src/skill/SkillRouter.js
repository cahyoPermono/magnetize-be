const express = require('express');
const SkillService = require('./SkillService');
const router = express.Router();

router.post(
  '/api/1.0/skills',
  async (req, res) => {
    const data = await SkillService.save(req.body);
    return res.send({ message: 'Success Save Skill', data: data });
  }
);

router.get('/api/1.0/skills', async (req, res) => {
  const skill = await SkillService.find();
  res.send({ message: 'Success Get skill', data: skill });
});

router.get('/api/1.0/skills/:jobId', async (req, res) => {
  const skill = await SkillService.findbyIdJob(req.params.jobId);
  res.send({ message: 'Success Get', data: skill });
});

module.exports = router;
