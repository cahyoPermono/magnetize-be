const Job = require('./Job');
const Skill = require('./Skill');

const save = async (body) => {
  const job = { ...body };
  await Job.create(job);
};

const find = async () => {
  const job = await Job.findAll({
    include: [
      Skill
    ],
  });
  if (job) {
    return job;
  }
  return false;
};

module.exports = { save, find };
