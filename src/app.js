const express = require('express');
const UserRouter = require('./user/UserRouter');
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

const app = express();

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

module.exports = app;
