const request = require('supertest');
const app = require('../src/app');
const Answer = require('../src/disc/Answer');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return Answer.destroy({
    truncate: true,
  });
});

const validAnswer = {
  name: 'name1',
  email: 'name1@gmail.com',
  role: 'WebApp Trainee',
  p1: '1',            p9: '33',            p17: '65',
  k1: '4',            k9: '36',            k17: '68',
  p2: '5',            p10: '37',           p18: '69',
  k2: '8',            k10: '40',           k18: '72',
  p3: '9',            p11: '41',           p19: '73',
  k3: '12',           k11: '44',           k19: '76',
  p4: '13',           p12: '45',           p20: '77',
  k4: '16',           k12: '48',           k20: '80',
  p5: '17',           p13: '49',           p21: '81',
  k5: '20',           k13: '52',           k21: '84',
  p6: '21',           p14: '53',           p22: '85',
  k6: '24',           k14: '56',           k22: '88',
  p7: '25',           p15: '57',           p23: '89',
  k7: '28',           k15: '60',           k23: '92',
  p8: '29',           p16: '61',           p24: '93',
  k8: '32',           k16: '64',           k24: '96',
  
};

const postAnswer = (answer = validAnswer) => {
  return request(app).post('/api/1.0/answers').send(answer);
};

const getAnswerByEmail = () => {
  return request(app).get('/api/1.0/answers/name1@gmail.com');
}

describe('Submit Answer', () => {
  it('returns 200 OK when submit is valid', async () => {
    const response = await postAnswer();
    expect(response.status).toBe(200);
  });

  it('returns success message when submit is valid', async () => {
    const response = await postAnswer();
    expect(response.body.message).toBe('Answer Saved');
  });

  it('save answer to databases', async () => {
    await postAnswer();
    const answerList = await Answer.findAll();
    expect(answerList.length).toBe(1);
  });

  it('save name, email and role to databases', async () => {
    await postAnswer();
    const answerList = await Answer.findAll();
    const savedData = answerList[0];
    expect(savedData.name).toBe('name1');
    expect(savedData.email).toBe('name1@gmail.com');
    expect(savedData.role).toBe('WebApp Trainee');
  });

  it('returns error 400 when name is null', async () => {
    const response = await postAnswer({
      email: 'name1@gmail.com',
      role: 'WebApp Trainee',
      p1: '1',            p9: '33',            p17: '65',
      k1: '4',            k9: '36',            k17: '68',
      p2: '5',            p10: '37',           p18: '69',
      k2: '8',            k10: '40',           k18: '72',
      p3: '9',            p11: '41',           p19: '73',
      k3: '12',           k11: '44',           k19: '76',
      p4: '13',           p12: '45',           p20: '77',
      k4: '16',           k12: '48',           k20: '80',
      p5: '17',           p13: '49',           p21: '81',
      k5: '20',           k13: '52',           k21: '84',
      p6: '21',           p14: '53',           p22: '85',
      k6: '24',           k14: '56',           k22: '88',
      p7: '25',           p15: '57',           p23: '89',
      k7: '28',           k15: '60',           k23: '92',
      p8: '29',           p16: '61',           p24: '93',
      k8: '32',           k16: '64',           k24: '96',
    });
    expect(response.status).toBe(400);
  });

  it('returns error 400 when email is null', async () => {
    const response = await postAnswer({
      name: 'name1',
      role: 'WebApp Trainee',
      p1: '1',            p9: '33',            p17: '65',
      k1: '4',            k9: '36',            k17: '68',
      p2: '5',            p10: '37',           p18: '69',
      k2: '8',            k10: '40',           k18: '72',
      p3: '9',            p11: '41',           p19: '73',
      k3: '12',           k11: '44',           k19: '76',
      p4: '13',           p12: '45',           p20: '77',
      k4: '16',           k12: '48',           k20: '80',
      p5: '17',           p13: '49',           p21: '81',
      k5: '20',           k13: '52',           k21: '84',
      p6: '21',           p14: '53',           p22: '85',
      k6: '24',           k14: '56',           k22: '88',
      p7: '25',           p15: '57',           p23: '89',
      k7: '28',           k15: '60',           k23: '92',
      p8: '29',           p16: '61',           p24: '93',
      k8: '32',           k16: '64',           k24: '96',
    });
    expect(response.status).toBe(400);
  });

  it('returns error 400 when role is null', async () => {
    const response = await postAnswer({
      name: 'name1',
      email: 'name1@gmail.com',
      p1: '1',            p9: '33',            p17: '65',
      k1: '4',            k9: '36',            k17: '68',
      p2: '5',            p10: '37',           p18: '69',
      k2: '8',            k10: '40',           k18: '72',
      p3: '9',            p11: '41',           p19: '73',
      k3: '12',           k11: '44',           k19: '76',
      p4: '13',           p12: '45',           p20: '77',
      k4: '16',           k12: '48',           k20: '80',
      p5: '17',           p13: '49',           p21: '81',
      k5: '20',           k13: '52',           k21: '84',
      p6: '21',           p14: '53',           p22: '85',
      k6: '24',           k14: '56',           k22: '88',
      p7: '25',           p15: '57',           p23: '89',
      k7: '28',           k15: '60',           k23: '92',
      p8: '29',           p16: '61',           p24: '93',
      k8: '32',           k16: '64',           k24: '96',
    });
    expect(response.status).toBe(400);
  });

  it.each`
    field         | value                   | expectedMessage
    ${'name'}     | ${null}                 | ${'Name cannot be null'}
    ${'email'}    | ${null}                 | ${'Email cannot be null'}
    ${'email'}    | ${'a.com'}              | ${'Email must be valid'}
    ${'email'}    | ${'a.a.com'}            | ${'Email must be valid'}
    ${'email'}    | ${'a@com'}              | ${'Email must be valid'}
    ${'role'}     | ${null}                 | ${'Role cannot be null'}
  `(
    'returns $expectedMessage when $field is $value',
    async ({ field, value, expectedMessage }) => {
      const answer = {
        name: 'name1',
        email: 'name1@gmail.com',
        role: 'WebApp Trainee',
      };
      answer[field] = value;
      const response = await postAnswer(answer);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    });
});

describe('Get Answers By Email', () => {
  it('returns 200 OK when success get answer by email', async () => {
    const response = await getAnswerByEmail();
    expect(response.status).toBe(200);
  });
  

  it('returns success message when success get answer by email', async () => {
    const response = await getAnswerByEmail();
    expect(response.body.message).toBe('Success Get Answer');
  });
});
