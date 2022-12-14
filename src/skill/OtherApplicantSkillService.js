const OtherApplicantSkill = require('./OtherApplicantSkill');
const Applicant = require('../applicant/Applicant');

const save = async (body) => {
  const otherapplicantskill = { ...body };
  await OtherApplicantSkill.create(otherapplicantskill);
};

const find = async () => {
  const otherapplicantskill = await OtherApplicantSkill.findAll({
    include: [
      {
        model: Applicant,
      },
    ],
  });
  if (otherapplicantskill) {
    return otherapplicantskill;
  }

  return false;
};

const findByIdApplicant = async (applicantId) => {
  const otherapplicantskill = await OtherApplicantSkill.findAll({
    where: {
      applicantId: applicantId,
    },
  });
  if (otherapplicantskill) {
    return otherapplicantskill;
  }

  return false;
};

module.exports = { save, find, findByIdApplicant };
