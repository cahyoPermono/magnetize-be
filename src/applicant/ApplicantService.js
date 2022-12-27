const Applicant = require('./Applicant');
const Family = require('../applicant/Family');
const FormalEducation = require('../applicant/FormalEducation');
const NonFormalEducation = require('../applicant/NonFormalEducation');
const ComputerLiterate = require('../applicant/ComputerLiterate');
const EmploymentHistory = require('../applicant/EmploymentHistory');
const JobDescription = require('../applicant/JobDescription');
const OtherInformation = require('../applicant/OtherInformation');
const AttachmentApplicant = require('../applicant/AttachmentApplicant');
const ApplicantSkill = require('../skill/ApplicantSkill');
const OtherApplicantSkill = require('../skill/OtherApplicantSkill');
const Job = require('../skill/Job');

const save = async (body) => {
  const applicant = { ...body };
  await Applicant.create(applicant);
};

const allApplicant = async() => {
  const applicant = await Applicant.findAll();
  if(applicant){
    return applicant;
  }
  return false;
};

const find = async (JobId) => {
  const applicant = await Applicant.findAll({
    where: { JobId: JobId },
    include: [Job],
  });
  if (applicant) {
    return applicant;
  }
  return false;
};

const findOrder = async () => {
  const applicant = await Applicant.findAll({
    limit: 1,
    order: [['id', 'desc']],
  });
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
      EmploymentHistory, JobDescription, OtherInformation, AttachmentApplicant, 
      ApplicantSkill, OtherApplicantSkill, Job
    ],
  });
  if (applicant) {
    return applicant;
  }
  return false;
};

module.exports = { save, find, byId, findOrder, allApplicant };
