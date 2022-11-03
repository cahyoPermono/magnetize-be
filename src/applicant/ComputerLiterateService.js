const ComputerLiterate = require('./ComputerLiterate');
const Applicant = require('./Applicant');

const save = async (body) => {
  const computerliterate = { ...body };
  await ComputerLiterate.create(computerliterate);
};

const save2 = async (applicantId, body) => {
  const computerliterate = { applicantId: applicantId, ...body };
  await ComputerLiterate.create(computerliterate);
};

const find = async () => {
  const computerliterate = await ComputerLiterate.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (computerliterate) {
    return computerliterate;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const computerliterate = await ComputerLiterate.findAll({
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
  if (computerliterate) {
    return computerliterate;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
