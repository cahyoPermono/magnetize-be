const Skill = require('./Skill');
const Job = require('./Job');

const save = async (body) => {
  const skill = { ...body };
  await Skill.create(skill);
};

const find = async () => {
  const skill = await Skill.findAll({
    include: [
      {
        model: Job,
      },
    ],
  });
  if (skill) {
    return skill;
  }

  return false;
};

module.exports = { save, find };
