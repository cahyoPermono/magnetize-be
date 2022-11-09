const express = require('express');
const UserRouter = require('./user/UserRouter');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

const QuestionRouter = require('./disc/QuestionRouter');
const AnswerRouter = require('./disc/AnswerRouter');
const ApplicantRouter = require('./applicant/ApplicantRouter');
const FamilyRouter = require('./applicant/FamilyRouter');
const FormalEducationRouter = require('./applicant/FormalEducationRouter');
const NonFormalEducationRouter = require('./applicant/NonFormalEducationRouter');
const ComputerLiterateRouter = require('./applicant/ComputerLiterateRouter');
const EmploymentHistoryRouter = require('./applicant/EmploymentHistoryRouter');
const JobDescriptionRouter = require('./applicant/JobDescriptionRouter');
const OtherInformationRouter = require('./applicant/OtherInformationRouter');
const AttachmentRouter = require('./applicant/AttachmentRouter');
const JobRouter = require('./skill/JobRouter');
const SkillRouter = require('./skill/SkillRouter');
const SubSkillRouter = require('./skill/SubSkillRouter');
const ApplicantSkillRouter = require('./skill/ApplicantSkillRouter')

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      lookupHeader: 'accept-language',
    },
  });

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      lookupHeader: 'accept-language',
    },
  });

const app = express();

app.use(middleware.handle(i18next));

app.use(express.json({limit: '100mb'}));
const cors = require('cors');
app.use(cors());

app.use(UserRouter);
app.use(QuestionRouter);
app.use(AnswerRouter);
app.use(ApplicantRouter);
app.use(FamilyRouter);
app.use(FormalEducationRouter);
app.use(NonFormalEducationRouter);
app.use(ComputerLiterateRouter);
app.use(EmploymentHistoryRouter);
app.use(JobDescriptionRouter);
app.use(OtherInformationRouter);
app.use(AttachmentRouter);
app.use(JobRouter);
app.use(SkillRouter);
app.use(SubSkillRouter)
app.use(ApplicantSkillRouter);

module.exports = app;
