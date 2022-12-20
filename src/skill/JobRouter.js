const express = require('express');
const JobService = require('./JobService');
const Job = require('./Job');
const router = express.Router();

router.post('/api/1.0/jobs', async (req, res) => {
  await JobService.save(req.body);
  return res.send({ message: 'Success Add Job' });
});

router.get('/api/1.0/jobs', async (req, res) => {
  const job = await JobService.find();
  res.send({ message: 'Success Get Job', data: job });
});

router.get('/api/1.0/jobs/:id', async (req, res) => {
  const job = await JobService.findOne(req.params.id);
  if (job) {
    res.send({ message: 'Success Get Job', data: job });
  } else {
    res.send({ message: "no data !" })
  }
});

router.put("/api/1.0/update_job/:id", async (req, res) => {
  const id = req.params.id;
  const job = await Job.findOne({ where: { id: id, } });

  if (!job) {
    res.send({ message: "no Job found !" })
  } else {
    Job.update(req.body, { where: { id: id } })
      .then(() => {
        res.send({ message: `${job.name} data telah diupdate` });
      }).catch(err => {
        res.send({ message: err });
      });
  }
});
module.exports = router;
