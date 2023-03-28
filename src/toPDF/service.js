const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const nodemailer = require("nodemailer");
const ApplicantService = require("../applicant/ApplicantService");
const SubSkillService = require("../skill/SubSkillService");
const email = require('../config/emailReceiver');

const options = {
  format: "A4",
  orientation: "potrait",
  border: "10mm",
};
router.get("/api/1.0/download_pdf", async (req, res) => {
  const filename = "applicantDocs_first_" + req.query.name + "_" + req.query.id + ".pdf";
  // const filename_TechnicalSkill = "TechApplicantDocs_" + req.params.id + ".pdf";

  fs.readFile("./docs/" + filename, "base64", (err, dataPDF) => {
    if (err) {
      res.send({ message: "error !" });
    } else {
      res.send({
        dataPDF: dataPDF
      });
    }
  });
});

router.get("/api/1.0/topdf/:id", async (req, res) => {
  const html = fs.readFileSync(
    path.join(__dirname, "../toPDF/template/temp.html"),
    "utf-8"
  );
  const dataApplicant = await ApplicantService.byId(req.params.id);

  const filename = "applicantDocs_" + dataApplicant.id + ".pdf";

  const dataApplicantPromise = {
    name: dataApplicant.name,
    gender: dataApplicant.gender,
    place_of_birth: dataApplicant.place_of_birth,
    date: dataApplicant.date
      .toISOString()
      .substring(0, 10)
      .split("-")
      .reverse()
      .join("-"),
    blood_type: dataApplicant.blood_type,
    address: dataApplicant.address,
    postal_code_address: dataApplicant.postal_code_address,
    domicile: dataApplicant.domicile,
    postal_code_domicile: dataApplicant.postal_code_domicile,
    phone: dataApplicant.phone,
    mobile: dataApplicant.mobile,
    office_parent_phone: dataApplicant.office_parent_phone,
    email: dataApplicant.email,
    id_sim_no: dataApplicant.id_sim_no,
    valid_to: dataApplicant.valid_to,
    npwp_no: dataApplicant.npwp_no,
    account_no: dataApplicant.account_no,
    religion: dataApplicant.religion,
    position: dataApplicant.job.name,
    photo: dataApplicant.photo,
    marital_status: dataApplicant.marital_status,
    year_marriage: dataApplicant.year_marriage,
  };

  const families = dataApplicant.families;
  const familiesPromise = [];
  families.forEach((element) => {
    let args = {
      member: element.member,
      name: element.name,
      gender: element.gender,
      date: element.date
        .toISOString()
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("-"),
      education: element.education,
      occupation_company: element.occupation_company,
    };
    familiesPromise.push(args);
  });

  const formaleducation = dataApplicant.formaleducations;
  const formaleducationPromise = [];
  formaleducation.forEach((element) => {
    let args = {
      level: element.level,
      name_location: element.name_location,
      major: element.major,
      entry: element.entry,
      graduate: element.graduate,
    };
    formaleducationPromise.push(args);
  });

  const nonformaleducation = dataApplicant.nonformaleducations;
  const nonformaleducationsPromise = [];
  nonformaleducation.forEach((element) => {
    let args = {
      course: element.course,
      year: element.year,
      duration: element.duration,
      certificate: element.certificate,
      sponsored_by: element.sponsored_by,
    };
    nonformaleducationsPromise.push(args);
  });

  const computerliterates = dataApplicant.computerliterates;
  const computerliteratesPromise = [];
  computerliterates.forEach((element) => {
    let args = {
      skill: element.skill,
      level: element.level,
    };
    computerliteratesPromise.push(args);
  });

  const employmenthistories = dataApplicant.employmenthistories;
  const employmenthistoriesPromise = [];
  employmenthistories.forEach((element) => {
    let args = {
      start: element.start,
      end: element.end,
      name_company: element.name_company,
      position: element.position,
      direct_supervisor: element.direct_supervisor,
      take_home_pay: element.take_home_pay,
      reason_leaving: element.reason_leaving,
    };
    employmenthistoriesPromise.push(args);
  });

  const jobdescriptionPromise = {
    desciption: dataApplicant.jobdescription.description,
  };

  const otherinformationPromise = {
    hospitalized: dataApplicant.otherinformation.hospitalized,
    disease: dataApplicant.otherinformation.disease,
    psycological_test: dataApplicant.otherinformation.psycological_test,
    experience_tellecomunication:
      dataApplicant.otherinformation.experience_tellecomunication,
    experience_it: dataApplicant.otherinformation.experience_it,
    reason_join: dataApplicant.otherinformation.reason_join,
    reason_hire: dataApplicant.otherinformation.reason_hire,
    opinion_teamwork: dataApplicant.otherinformation.opinion_teamwork,
    plan: dataApplicant.otherinformation.plan,
    respond_target: dataApplicant.otherinformation.respond_target,
    respond_preasure: dataApplicant.otherinformation.respond_preasure,
    reason_leave_last_company:
      dataApplicant.otherinformation.reason_leave_last_company,
    salary_expect: dataApplicant.otherinformation.salary_expect,
    able_to_start: dataApplicant.otherinformation.able_to_start,
    contact_emergency: dataApplicant.otherinformation.contact_emergency,
    relatives_in_ip: dataApplicant.otherinformation.relatives_in_ip,
    strength: dataApplicant.otherinformation.strength,
    weakness: dataApplicant.otherinformation.weakness,
  };

  const attachmentapplicants = dataApplicant.attachmentapplicants;
  const attachmentapplicantsPromise = [];
  attachmentapplicants.forEach((element) => {
    let args = {
      type: element.type,
      file: element.file,
    };
    attachmentapplicantsPromise.push(args);
  });

  //dataApplicantPromise, familiesPromise, formaleducationPromise, nonformaleducationsPromise,
  //computerliteratesPromise, employmenthistoriesPromise, jobdescriptionPromise, otherinformationPromise,
  //attachmentapplicantsPromise

  const document = {
    html: html,
    data: {
      dataApplicantPromise: dataApplicantPromise,
      familiesPromise: familiesPromise,
      formaleducationPromise: formaleducationPromise,
      nonformaleducationsPromise: nonformaleducationsPromise,
      computerliteratesPromise: computerliteratesPromise,
      employmenthistoriesPromise: employmenthistoriesPromise,
      jobdescriptionPromise: jobdescriptionPromise,
      otherinformationPromise: otherinformationPromise,
      attachmentapplicantsPromise: attachmentapplicantsPromise,
    },
    path: "./docs/" + filename,
  };
  const filepath = "http://localhost:3000/docs/" + filename;

  await pdf
    .create(document, options)
    .then(() => {
      fs.readFile("./docs/" + filename, "base64", (err, dataPDF) => {
        if (err) throw err;
        res.send({
          filepath: filepath,
          message: "pdf generated",
          pdf: dataPDF,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/api/1.0/topdf_skill/:id", async (req, res) => {
  try {
    const dataApplicant = await ApplicantService.findOrder();
    const dataApplicantPromise = {
      name: dataApplicant[0].name,
      phone: dataApplicant[0].mobile,
      position: dataApplicant[0].job.name,
    };

    const applicantskills = [];
    dataApplicant[0].applicantskills.forEach((element) => {
      applicantskills.push({
        subskill_id: element.subskillId,
        nilai: element.nilai,
        keterangan: element.keterangan,
      });
    });
    let a = [];
    const subskill = await SubSkillService.find();
    subskill.forEach((element) => {
      applicantskills.forEach((e) => {
        if (element.id === e.subskill_id) {
          a.push({
            skill: element.skill.skill,
            subskill: element.subskill,
            nilai: e.nilai,
            keterangan: e.keterangan,
          });
        }
      });
    });
    const skills = [];
    for (let item of a) {
      const { skill } = item;
      if (!skills.includes(skill)) {
        skills.push(skill);
      }
    }
    let c = [];
    skills.forEach((el) => {
      const y = { skill: el, subskill: [] };
      a.forEach((e) => {
        if (e.skill === y.skill) {
          const x = {
            subskill: e.subskill,
            nilai: e.nilai,
            keterangan: e.keterangan,
          };
          y.subskill.push(x);
        }
      });
      c.push(y);
    });

    const html = fs.readFileSync(
      path.join(__dirname, "../toPDF/template/temp_tech.html"),
      "utf-8"
    );
    const filename_TechnicalSkill = "TechApplicantDocs_" + req.params.id + ".pdf";

    const document = {
      html: html,
      data: {
        dataApplicant: dataApplicantPromise,
        skillAplicant: c,
      },
      path: "./docs/" + filename_TechnicalSkill,
    };
    await pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    const transporter = nodemailer.createTransport(email.sender);
    const text = `<p><b>Dear HR Imani Prima,</b> <br><br>Diinformasikan bahwa ada pelamar baru yang telah mengisi formulir, yaitu: <br> Nama: ${dataApplicantPromise.name} <br>Posisi: ${dataApplicantPromise.position} <br><br>formulir yang telah diisi pelamar terlamir. Terima Kasih</p>`;
    const filename_DataApplicant = "applicantDocs_" + req.params.id + ".pdf";
    const subject =
      dataApplicantPromise.name + " - " + dataApplicantPromise.position;
    const test = {
      from: email.sender.auth.user,
      to: email.receiver,
      subject: subject,
      html: text,
      attachments: [
        {
          filename: filename_TechnicalSkill,
          path: "./docs/" + filename_TechnicalSkill,
        },
        {
          filename: filename_DataApplicant,
          path: "./docs/" + filename_DataApplicant,
        },
      ],
    };
    transporter.sendMail(test, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email send");
        // Send base64 pdf to client
        res.send({ message: "Email Send!" });
      }
    });
  } catch (error) {
    res.send({ message: error })
  }
});

module.exports = router;
