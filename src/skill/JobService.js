const Departements = require('../departements/Departements');
const JobCategories = require('../jobCategories/JobCategories');
const User = require('../user/User');
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
      Skill, User, Departements, JobCategories
    ],
  });
  if (job) {
    return job;
  }
  return false;
};

const find = async () => {
  const job = await Job.findAll({
    include: [
      Departements, JobCategories
    ]
  });
  if (job) {
    return job;
  }
  return false;
};

module.exports = { save, find, findOne };
