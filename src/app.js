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

module.exports = app;
