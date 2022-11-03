const Applicant = require('./Applicant');
const Family = require('../applicant/Family');
const FormalEducation = require('../applicant/FormalEducation');
const NonFormalEducation = require('../applicant/NonFormalEducation');
const ComputerLiterate = require('../applicant/ComputerLiterate');
const EmploymentHistory = require('../applicant/EmploymentHistory');
const JobDescription = require('../applicant/JobDescription');
const OtherInformation = require('../applicant/OtherInformation');
const Attachment = require('../applicant/Attachment');

const save = async (body) => {
  const applicant = { ...body };
  await Applicant.create(applicant);
};

const find = async () => {
  const applicant = await Applicant.findAll({});
  if (applicant) {
    return applicant;
  }
  return false;
};

const byId = async (id) => {
  const applicant = await Applicant.findOne({
    where: {
      id: id,
    },
    include: [
      Family, FormalEducation, NonFormalEducation, ComputerLiterate,
      EmploymentHistory, JobDescription, OtherInformation, Attachment
    ],
  });
  if (applicant) {
    return applicant;
  }
  return false;
};

module.exports = { save, find, byId };
