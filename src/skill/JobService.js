const Job = require('./Job');

const save = async (body) => {
  const job = { ...body };
  await Job.create(job);
};

const find = async () => {
  const job = await Job.findAll({});
  if (job) {
    return job;
  }
  return false;
};

module.exports = { save, find };
