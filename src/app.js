const express = require('express');
const UserRouter = require('./user/UserRouter');
const QuestionRouter = require('./disc/QuestionRouter');
const AnswerRouter = require('./disc/AnswerRouter');

const app = express();

app.use(express.json());

app.use(UserRouter);
app.use(QuestionRouter);
app.use(AnswerRouter);

module.exports = app;
