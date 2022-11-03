const EmploymentHistory = require('./EmploymentHistory');
const Applicant = require('./Applicant');

const save = async (body) => {
  const employmenthistory = { ...body };
  await EmploymentHistory.create(employmenthistory);
};

const save2 = async (applicantId, body) => {
  const employmenthistory = { applicantId: applicantId, ...body };
  await EmploymentHistory.create(employmenthistory);
};

const find = async () => {
  const employmenthistory = await EmploymentHistory.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (employmenthistory) {
    return employmenthistory;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const employmenthistory = await EmploymentHistory.findAll({
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
  if (employmenthistory) {
    return employmenthistory;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
