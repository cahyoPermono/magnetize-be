const Job = require('./Job');
const Skill = require('./Skill');

const save = async (body) => {
  const job = { ...body };
  await Job.create(job);
};
const findOne = async (id) => {
  const job = await Job.findOne({
    where: { id: id },
    include: [
      Skill
    ],
  });
  if (job) {
    return job;
  }
  return false;
};

const find = async () => {
  const job = await Job.findAll();
  if (job) {
    return job;
  }
  return false;
};

module.exports = { save, find, findOne };
