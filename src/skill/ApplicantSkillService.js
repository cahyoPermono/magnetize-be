const ApplicantSkill = require('./ApplicantSkill');
const SubSkill = require('./SubSkill');
const Applicant = require('../applicant/Applicant');

const save = async (body) => {
  const applicantskill = { ...body };
  await ApplicantSkill.create(applicantskill);
};

const find = async () => {
  const applicantskill = await ApplicantSkill.findAll({
    include: [
      SubSkill, Applicant
    ],
  });
  if (applicantskill) {
    return applicantskill;
  }

  return false;
};

module.exports = { save, find };
