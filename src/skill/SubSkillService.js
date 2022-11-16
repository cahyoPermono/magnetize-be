const SubSkill = require('./SubSkill');
const Skill = require('./Skill');

const save = async (body) => {
  const subskill = { ...body };
  await SubSkill.create(subskill);
};

const find = async () => {
  const subskill = await SubSkill.findAll({
    include: [
      {
        model: Skill,
      },
    ],
  });
  if (subskill) {
    return subskill;
  }

  return false;
};

const findbyIdSkill = async (skillId) => {
  const subskill = await SubSkill.findAll({
    where: {
      skillId: skillId,
    },
  });
  if (subskill) {
    return subskill;
  }
  return false;
};

module.exports = { save, find, findbyIdSkill };
