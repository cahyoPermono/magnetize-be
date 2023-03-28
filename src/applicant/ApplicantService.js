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
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const email = require('../config/emailReceiver');

const save = async (body) => {
  const applicant = { ...body };
  await Applicant.create(applicant);
};

const allApplicant = async () => {
  const applicant = await Applicant.findAll();
  if (applicant) {
    return applicant;
  }
  return false;
};

const find = async () => {
  const applicant = await Applicant.findAll({
    include: [Job]
  });
  if (applicant) {
    return applicant;
  }
  return false;
};

const findByJob = async (JobId) => {
  const applicant = await Applicant.findAll({
    where: { JobId: JobId },
    include: [Job]
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
    include: [ApplicantSkill, Job],
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
      EmploymentHistory, JobDescription, OtherInformation, AttachmentApplicant, ApplicantSkill, OtherApplicantSkill, Job
    ],
  });
  if (applicant) {
    return applicant;
  }
  return false;
};

const update = async (body, id) => {
  const applicant = { ...body };
  await Applicant.update(applicant, { where: { id: id } });
};

const update2 = async (body, id) => {
  await Applicant.update(body, { where: id });
};

const createPDF = async (body) => {
  try {
    const applicant = await allApplicant();
    const applicantId = applicant[applicant.length - 1];
    const options = {
      format: "A4",
      orientation: "potrait",
      border: "10mm",
    };
    const html = fs.readFileSync(
      path.join(__dirname, "./pdfTemp/tmp_form2.html"),
      "utf-8"
    );
    const filename = "applicantDocs_second_" + body.name + "_" + applicantId.id + ".pdf";
    const document = {
      html: html,
      data: {
        dataName: applicantId.name,
        dataPhoto: applicantId.photo,
        dataMartial: applicantId.marital_status,
        dataApplicantPromise: body.applicant,
        dataFamilyPromise: body.families,
      },
      path: "./docs/" + filename,
    };
    const create = await pdf.create(document, options);
    const transporter = nodemailer.createTransport(email.sender);
    const text = `<p><b>Dear HR Imani Prima,</b> <br><br>Diinformasikan bahwa pelamar ${body.name} baru yang telah mengisi formulir ke-dua<br><br>formulir yang telah diisi pelamar terlamir. Terima Kasih</p>`;
    const subject = "Hasil pengisian Tahap 2 - " + body.name ;
    const test = {
      from: email.sender.auth.user,
      to: email.receiver,
      subject: subject,
      html: text,
      attachments: [
        {
          filename: filename,
          path: "./docs/" + filename,
        },
      ],
    };
    transporter.sendMail(test, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email send");
      }
    });
  } catch (error) {
    console.log(error)
    return error
  }
};

module.exports = { save, find, byId, findOrder, findByJob, allApplicant, update, update2, createPDF };
