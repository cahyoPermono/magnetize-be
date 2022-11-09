const express = require('express');
const JobService = require('./JobService');
const router = express.Router();
router.post(
  '/api/1.0/jobs',
  async (req, res) => {
    await JobService.save(req.body);
    return res.send({ message: 'Success Add Job' });
  });
router.get(
  '/api/1.0/jobs',
  async (req, res) => {
    const job = await JobService.find();
      res.send({ message: 'Success Get Job', data: job });
  });
module.exports = router;
