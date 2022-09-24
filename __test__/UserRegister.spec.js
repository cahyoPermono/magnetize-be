const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({
    truncate: true,
  });
});

const validUser = {
  username: 'user1',
  email: 'username@email.com',
  password: 'Asdf1234',
};

const postUser = (user = validUser) => {
  return request(app).post('/api/1.0/users').send(user);
};

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });

  it('returns success message when signup request is valid', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User Created');
  });

  it('save user to databases', async () => {
    await postUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('save username and email to databases', async () => {
    await postUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('username@email.com');
  });

  it('save hashing password', async () => {
    await postUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('Asdf1234');
  });

  it('returns error 400 when username is null', async () => {
    const response = await postUser({
      email: 'username@email.com',
      password: 'Asdf1234',
    });
    expect(response.status).toBe(400);
  });

  it('returns validationErrors field in response body when validation error occurs', async () => {
    const response = await postUser({
      email: 'username@email.com',
      password: 'Asdf1234',
    });
    expect(response.body.validationErrors).not.toBeUndefined();
  });

  it('returns Message Username cannot be null when username is null', async () => {
    const response = await postUser({
      email: 'username@email.com',
      password: 'Asdf1234',
    });
    expect(response.body.validationErrors.username).toBe(
      'Username cannot be null'
    );
  });

  it('returns Message Email cannot be null when email is null', async () => {
    const response = await postUser({
      username: 'user1',
      password: 'Asdf1234',
    });
    expect(response.body.validationErrors.email).toBe('Email cannot be null');
  });

  it('returns Errors for both when Email and Username is null', async () => {
    const response = await postUser({
      password: 'Asdf1234',
    });
    const { body } = response;
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });
});
