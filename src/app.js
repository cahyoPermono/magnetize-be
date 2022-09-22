const express = require('express');
const UserRouter = require('./user/UserRouter');

const app = express();
const saltRounds = 10;

app.use(express.json());

app.use(UserRouter);

module.exports = app;
