const express = require('express');
const UserRouter = require('./user/UserRouter');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const QuestionRouter = require('./disc/QuestionRouter');
const AnswerRouter = require('./disc/AnswerRouter');
const DepartementsRouter = require('./departements/DepartementsRouter');
const NotesRouter = require('./notes/NotesRouter');
const AttachmentsRouter = require('./attachments/AttachmentsRouter');
const GuestRouter = require('./guest/GuestRouter');
const ApplicantRouter = require('./applicant/ApplicantRouter');
const FamilyRouter = require('./applicant/FamilyRouter');
const FormalEducationRouter = require('./applicant/FormalEducationRouter');
const NonFormalEducationRouter = require('./applicant/NonFormalEducationRouter');
const ComputerLiterateRouter = require('./applicant/ComputerLiterateRouter');
const EmploymentHistoryRouter = require('./applicant/EmploymentHistoryRouter');
const JobDescriptionRouter = require('./applicant/JobDescriptionRouter');
const OtherInformationRouter = require('./applicant/OtherInformationRouter');
const AttachmentRouter = require('./applicant/AttachmentRouter');

const path = require('path');
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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

const cors = require('cors');
app.use(middleware.handle(i18next));

app.use(express.json({limit: '100mb'}));
app.use(cors());

app.use(UserRouter);
app.use(QuestionRouter);
app.use(AnswerRouter);
app.use(DepartementsRouter);
app.use(NotesRouter);
app.use(AttachmentsRouter);
app.use(GuestRouter);
app.use(ApplicantRouter);
app.use(FamilyRouter);
app.use(FormalEducationRouter);
app.use(NonFormalEducationRouter);
app.use(ComputerLiterateRouter);
app.use(EmploymentHistoryRouter);
app.use(JobDescriptionRouter);
app.use(OtherInformationRouter);
app.use(AttachmentRouter);
module.exports = app;
