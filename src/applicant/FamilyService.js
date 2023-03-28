const Family = require('./Family');
const Applicant = require('./Applicant');

const save = async (body) => {
  const family = { ...body };
  await Family.create(family);
};

const save2 = async (applicantId, body) => {
  const family = { applicantId: applicantId, ...body };
  await Family.create(family);
};

const find = async () => {
  const family = await Family.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['id', 'name'],
      },
    ],
  });
  if (family) {
    return family;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const family = await Family.findAll({
    where: {
      applicantId: id,
    },
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (family) {
    return family;
  }
  return false;
};

const update = async (body, id) => {
  const family = { ...body };
  await Family.update(family, { where: { id: id } });
};

module.exports = { save, save2, find, byIdApplicant, update };
