const express = require('express');
const ApplicantService = require('./ApplicantService');
const FamilyService = require('./FamilyService');
const FormalEducationService = require('./FormalEducationService');
const NonFormalEducationService = require('./NonFormalEducationService');
const ComputerLiterateService = require('./ComputerLiterateService');
const EmploymentHistoryService = require('./EmploymentHistoryService');
const JobDescriptionService = require('./JobDescriptionService');
const OtherInformationService = require('./OtherInformationService');
const AttachmentService = require('./AttachmentService');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/api/1.0/applicants',
  check('applicant.name').notEmpty().withMessage('Name cannot be null'),
  check('applicant.gender').notEmpty().withMessage('Gender cannot be null'),
  check('applicant.place_of_birth').notEmpty().withMessage('Place of Birth cannot be null'),
  check('applicant.date').notEmpty().withMessage('Date of Birth cannot be null'),
  check('applicant.address').notEmpty().withMessage('Home Address cannot be null'),
  check('applicant.postal_code_address').notEmpty().withMessage('Postal Code Address cannot be null'),
  check('applicant.mobile').notEmpty().withMessage('Mobile cannot be null'),
  check('applicant.email').notEmpty().withMessage('Email cannot be null'),
  check('applicant.id_sim_no').notEmpty().withMessage('ID / SIM No cannot be null'),
  check('applicant.religion').notEmpty().withMessage('Religion cannot be null'),
  check('applicant.photo').notEmpty().withMessage('Photo cannot be null'),

  check('family.*.member').notEmpty().withMessage('Member cannot be null'),
  check('family.*.name').notEmpty().withMessage('Name cannot be null'),
  check('family.*.gender').notEmpty().withMessage('Gender cannot be null'),
  check('family.*.date').notEmpty().withMessage('Date cannot be null'),

  check('formaleducation.level').notEmpty().withMessage('Level Education cannot be null'),
  check('formaleducation.name_location').notEmpty().withMessage('Name & Location cannot be null'),
  check('formaleducation.major').notEmpty().withMessage('Major cannot be null'),
  check('formaleducation.entry').notEmpty().withMessage('Entry cannot be null'),
  check('formaleducation.graduate').notEmpty().withMessage('Graduate cannot be null'),

  check('computerliterate.*.skill').notEmpty().withMessage('Skill cannot be null'),
  check('computerliterate.*.level').notEmpty().withMessage('Level cannot be null'),

  check('otherinformation.hospitalized').notEmpty().withMessage('Have you been hospitalized cannot be null'),
  check('otherinformation.psycological_test').notEmpty().withMessage('Taken psycological test cannot be null'),
  check('otherinformation.reason_join').notEmpty().withMessage('Why do you want to join cannot be null'),
  check('otherinformation.reason_hire').notEmpty().withMessage('Why we can hire you cannot be null'),
  check('otherinformation.opinion_teamwork').notEmpty().withMessage('Your opinion about teamwork cannot be null'),
  check('otherinformation.plan').notEmpty().withMessage('Short term plan and your long term plan cannot be null'),
  check('otherinformation.respond_target').notEmpty().withMessage('Respond to the target cannot be null'),
  check('otherinformation.respond_preasure').notEmpty().withMessage('Respond to pressure at work cannot be null'),
  check('otherinformation.salary_expect').notEmpty().withMessage('Salary do you expect cannot be null'),
  check('otherinformation.able_to_start').notEmpty().withMessage('When will you be able to start to work cannot be null'),
  check('otherinformation.contact_emergency').notEmpty().withMessage('Person to contact in case of emergency cannot be null'),
  check('otherinformation.strength').notEmpty().withMessage('What do you think is your strengths cannot be null'),
  check('otherinformation.weakness').notEmpty().withMessage('What do you think is your weaknesses cannot be null'),

  check('attachment.*.type').notEmpty().withMessage('Type cannot be null'),
  check('attachment.*.file').notEmpty().withMessage('File cannot be null'),

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
    const applicant = await ApplicantService.find();
    const applicantId = applicant[applicant.length - 1];

    for (let index = 0; index < req.body.family.length; index++) {
      await FamilyService.save2(applicantId.id, req.body.family[index]);
    }
    // await FamilyService.save2(applicantId.id, req.body.family);
    await FormalEducationService.save2(applicantId.id, req.body.formaleducation);

    for (let index = 0; index < req.body.nonformaleducation.length; index++) {
      await NonFormalEducationService.save2(applicantId.id, req.body.nonformaleducation[index]);
    }
    // await NonFormalEducationService.save2(applicantId.id, req.body.nonformaleducation);

    for (let index = 0; index < req.body.computerliterate.length; index++) {
      await ComputerLiterateService.save2(applicantId.id, req.body.computerliterate[index]);
    }
    // await ComputerLiterateService.save2(applicantId.id, req.body.computerliterate);

    for (let index = 0; index < req.body.employmenthistory.length; index++) {
      await EmploymentHistoryService.save2(applicantId.id, req.body.employmenthistory[index]);
    }
    // await EmploymentHistoryService.save2(applicantId.id, req.body.employmenthistory);

    await JobDescriptionService.save2(applicantId.id, req.body.jobdescription);

    await OtherInformationService.save2(applicantId.id, req.body.otherinformation);

    // await AttachmentService.save2(applicantId.id, req.body.attachment);
    for (let index = 0; index < req.body.attachment.length; index++) {
      await AttachmentService.save2(applicantId.id, req.body.attachment[index]);
    }
    return res.send({ message: 'Success Save Data' });
  }
);

router.get('/api/1.0/applicants', async (req, res) => {
  const applicant = await ApplicantService.findOrder();
  res.send({ message: 'Success Get Data Applicant', data: applicant });
});

router.get('/api/1.0/applicants/:id', async (req, res) => {
  const applicant = await ApplicantService.byId(req.params.id);
  res.send({ message: 'Success Get Data Applicant by Id', data: applicant });
});


module.exports = router;
