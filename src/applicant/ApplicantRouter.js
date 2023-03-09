const express = require('express');
const ApplicantService = require('./ApplicantService');
const Applicant = require('./Applicant');
const FormalEducationService = require('./FormalEducationService');
const NonFormalEducationService = require('./NonFormalEducationService');
const ComputerLiterateService = require('./ComputerLiterateService');
const EmploymentHistoryService = require('./EmploymentHistoryService');
const JobDescriptionService = require('./JobDescriptionService');
const OtherInformationService = require('./OtherInformationService');
const ApplicantAuthsService = require('./ApplicantAuthsService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//add new applicant
router.post(
  '/api/1.0/applicants',
  check('applicant.name').notEmpty().withMessage('Name cannot be null'),
  check('applicant.gender').notEmpty().withMessage('Gender cannot be null'),
  check('applicant.place_of_birth').notEmpty().withMessage('Place of Birth cannot be null'),
  check('applicant.date').notEmpty().withMessage('Date of Birth cannot be null'),
  check('applicant.province').notEmpty().withMessage('Home Address cannot be null'),
  check('applicant.city').notEmpty().withMessage('Home Address cannot be null'),
  check('applicant.district').notEmpty().withMessage('Home Address cannot be null'),
  check('applicant.subdistrict').notEmpty().withMessage('Home Address cannot be null'),
  check('applicant.postal_code_address').notEmpty().withMessage('Postal Code Address cannot be null'),
  check('applicant.address').notEmpty().withMessage('Home Address cannot be null'),
  check('applicant.mobile').notEmpty().withMessage('Mobile cannot be null'),
  check('applicant.email').notEmpty().withMessage('Email cannot be null'),
  check('applicant.religion').notEmpty().withMessage('Religion cannot be null'),
  check('applicant.photo').notEmpty().withMessage('Photo cannot be null'),
  check('applicant.JobId').notEmpty().withMessage('Job Id cannot be null'),
  check('applicant.martial_status').notEmpty().withMessage('martial status cannot be null'),

  check('otherinformation.hospitalized').notEmpty().withMessage('Have you been hospitalized cannot be null'),
  check('otherinformation.reason_hire').notEmpty().withMessage('Why we can hire you cannot be null'),
  check('otherinformation.plan').notEmpty().withMessage('Short term plan and your long term plan cannot be null'),
  check('otherinformation.psycological_test').notEmpty().withMessage('Taken psycological test cannot be null'),
  check('otherinformation.opinion_teamwork').notEmpty().withMessage('Your opinion about teamwork cannot be null'),
  check('otherinformation.respond_target').notEmpty().withMessage('Respond to the target cannot be null'),
  check('otherinformation.respond_preasure').notEmpty().withMessage('Respond to pressure at work cannot be null'),
  check('otherinformation.salary_expect').notEmpty().withMessage('Salary do you expect cannot be null'),
  check('otherinformation.able_to_start').notEmpty().withMessage('When will you be able to start to work cannot be null'),
  check('otherinformation.contact_emergency').notEmpty().withMessage('Person to contact in case of emergency cannot be null'),
  check('otherinformation.strength').notEmpty().withMessage('What do you think is your strengths cannot be null'),
  check('otherinformation.weakness').notEmpty().withMessage('What do you think is your weaknesses cannot be null'),
  check('otherinformation.part_time_job').notEmpty().withMessage('part time job cannot be null'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = error.msg));
      return res.status(400).send({ validationErrors });
    }

    await ApplicantService.save(req.body.applicant);
    const applicant = await ApplicantService.allApplicant();
    const applicantId = applicant[applicant.length - 1];

    await ApplicantAuthsService.ApplicantAuthUpdate(applicantId.id, req.body.applicant.ApplicantAuthId);

    for (let index = 0; index < req.body.formaleducation.length; index++) {
      await FormalEducationService.save2(applicantId.id, req.body.formaleducation[index]);
    }

    for (let index = 0; index < req.body.nonformaleducation.length; index++) {
      await NonFormalEducationService.save2(applicantId.id, req.body.nonformaleducation[index]);
    }

    for (let index = 0; index < req.body.computerliterate.length; index++) {
      await ComputerLiterateService.save2(applicantId.id, req.body.computerliterate[index]);
    }

    for (let index = 0; index < req.body.employmenthistory.length; index++) {
      await EmploymentHistoryService.save2(applicantId.id, req.body.employmenthistory[index]);
    }

    await JobDescriptionService.save2(applicantId.id, req.body.jobdescription);

    await OtherInformationService.save2(applicantId.id, req.body.otherinformation);

    return res.send({ message: 'Success Save Data' });
  }
);

//get one last applicant
router.get('/api/1.0/applicants', async (req, res) => {
  const applicant = await ApplicantService.findOrder();
  res.send({ message: 'Success Get Data Applicant', data: applicant });
});

//get all applicant
router.get('/api/1.0/all_applicant', async (req, res) => {
  const applicant = await ApplicantService.allApplicant();
  res.send({ message: 'Success Get Data Applicant', data: applicant });
});

//get all applicants (with jobId filter)
router.get('/api/1.0/allapplicants/:jobId', async (req, res) => {
  const applicant = await ApplicantService.findByJob(req.params.jobId);
  res.send({ message: 'Success Get Data Applicant', data: applicant });
});

//get applicant by ID within all data
router.get('/api/1.0/applicants/:id', async (req, res) => {
  const applicant = await ApplicantService.byId(req.params.id);
  res.send({ message: 'Success Get Data Applicant by Id', data: applicant });
});

//update applicant status
router.put("/api/1.0/tocandidate/:id", async (req, res) => {
  const id = req.params.id;
  const applicant = await Applicant.findOne({ where: { id: id } });

  if (!applicant) {
    res.send({ message: "no applicant found !" })
  } else {
    Applicant.update(req.body, { where: { id: id } })
      .then(() => {
        res.send({ message: `${applicant.name} telah menjadi kandidat` });
      })
      .catch(err => {
        res.send({ message: err });
      });
  }
});

module.exports = router;
