const request = require('supertest');
const app = require('../src/app');

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'username@email.com',
        password: 'Asdf1234',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('returns success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'username@email.com',
        password: 'Asdf1234',
      })
      .then((response) => {
        expect(response.body.message).toBe('User Created');
        done();
      });
  });
});
