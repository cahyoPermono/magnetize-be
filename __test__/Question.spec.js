const request = require('supertest');
const app = require('../src/app');
const Question = require('../src/disc/Question');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return Question.destroy({
    truncate: true,
  });
});

const validQuestion = {
  question: 'Masalah sosial itu penting',
};

const postQuestion = (ques = validQuestion) => {
  return request(app).post('/api/1.0/questions').send(ques);
};

const getQuestion = () => {
  return request(app).get('/api/1.0/questions');
}

describe('Adding Question', () => {
  it('returns 200 OK when input question is valid', async () => {
    const response = await postQuestion();
    expect(response.status).toBe(200);
  });

  it('returns success message when input question is valid', async () => {
    const response = await postQuestion();
    expect(response.body.message).toBe('Success Add Question');
  });

  it('save question to databases', async () => {
    await postQuestion();
    const questionList = await Question.findAll();
    const savedQuestion = questionList[0];
    expect(savedQuestion.question).toBe('Masalah sosial itu penting');
  });
});

describe('Get Question', () => {
  it('returns 200 OK when success get questions', async () => {
    const response = await getQuestion();
    expect(response.status).toBe(200);
  });
  

  it('returns success message when success get question', async () => {
    const response = await getQuestion();
    expect(response.body.message).toBe('Success Get Question');
  });
});
