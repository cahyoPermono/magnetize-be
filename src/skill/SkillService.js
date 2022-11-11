const Skill = require('./Skill');
const Job = require('./Job');
const Subskill = require('./SubSkill');

const save = async (body) => {
  const skill = { ...body };
  await Skill.create(skill);
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

module.exports = { save, find };
