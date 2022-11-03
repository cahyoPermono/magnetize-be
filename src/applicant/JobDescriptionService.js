const Applicant = require('./Applicant');
const JobDescription = require('./JobDescription');

const save = async (body) => {
  const jobdescription = { ...body };
  await JobDescription.create(jobdescription);
};

const save2 = async (applicantId, body) => {
  const jobdescription = { applicantId: applicantId, ...body };
  await JobDescription.create(jobdescription);
};

const find = async () => {
  const jobdescription = await JobDescription.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (jobdescription) {
    return jobdescription;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const jobdescription = await JobDescription.findAll({
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
  if (jobdescription) {
    return jobdescription;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
