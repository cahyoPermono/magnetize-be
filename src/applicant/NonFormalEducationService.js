const NonFormalEducation = require('./NonFormalEducation');
const Applicant = require('./Applicant');

const save = async (body) => {
  const nonformaleducation = { ...body };
  await NonFormalEducation.create(nonformaleducation);
};

const save2 = async (applicantId, body) => {
  const nonformaleducation = { applicantId: applicantId, ...body };
  await NonFormalEducation.create(nonformaleducation);
};

const find = async () => {
  const nonformaleducation = await NonFormalEducation.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (nonformaleducation) {
    return nonformaleducation;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const nonformaleducation = await NonFormalEducation.findAll({
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
  if (nonformaleducation) {
    return nonformaleducation;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
