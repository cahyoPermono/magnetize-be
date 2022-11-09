const express = require('express');
const SkillService = require('./SkillService');
const router = express.Router();

router.post(
  '/api/1.0/skills',
  async (req, res) => {
    await SkillService.save(req.body);
    return res.send({ message: 'Success Save Skill' });
  }
);

router.get('/api/1.0/skills', async (req, res) => {
  const skill = await SkillService.find();
  res.send({ message: 'Success Get skill', data: skill });
});

module.exports = router;
