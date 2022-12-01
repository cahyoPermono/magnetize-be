const express = require('express');
const JobService = require('./JobService');
const Applicant = require('../applicant/Applicant');
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
router.get(
  '/api/1.0/jobs/:id',
  async (req, res) => {
    const job = await JobService.findOne(req.params.id);
    if (job) {
      res.send({ message: 'Success Get Job', data: job });
    } else {
      res.send({ message: "no data !" })
    }
  });

module.exports = router;
