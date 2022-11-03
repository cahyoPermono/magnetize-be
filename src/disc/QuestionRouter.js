const express = require('express');
const QuestionService = require('./QuestionService');
const router = express.Router();
router.post(
  '/api/1.0/questions',
  async (req, res) => {
    await QuestionService.save(req.body);
    return res.send({ message: 'Success Add Question' });
  });
router.get(
  '/api/1.0/questions',
  async (req, res) => {
    const question = await QuestionService.find();
      res.send({ message: 'Success Get Question', data: question });
  });
module.exports = router;
