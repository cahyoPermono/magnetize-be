const Skill = require('./Skill');
const Job = require('./Job');
const Subskill = require('./SubSkill');

const save = async (body) => {
  const skill = { ...body };
  const data = await Skill.create(skill);
  return data;
};

const find = async () => {
  const skill = await Skill.findAll({
    include: [Job, Subskill],
  });
  if (skill) {
    return skill;
  }

  return false;
};

const findbyIdJob = async (jobId) => {
  const skill = await Skill.findAll({
    where: {
      jobId: jobId,
    },
    include: [
      Job, Subskill
    ],
  });
  if (skill) {
    return skill;
  }
  return false;
};

module.exports = { save, find, findbyIdJob };
