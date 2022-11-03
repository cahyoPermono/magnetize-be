const FormalEducation = require('./FormalEducation');
const Applicant = require('./Applicant');

const save = async (body) => {
  const formaleducation = { ...body };
  await FormalEducation.create(formaleducation);
};

const save2 = async (applicantId, body) => {
  const formaleducation = { applicantId: applicantId, ...body };
  await FormalEducation.create(formaleducation);
};

const find = async () => {
  const formaleducation = await FormalEducation.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (formaleducation) {
    return formaleducation;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const formaleducation = await FormalEducation.findAll({
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
  if (formaleducation) {
    return formaleducation;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
