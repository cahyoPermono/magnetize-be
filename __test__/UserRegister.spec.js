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

  it.each`
    field         | value                   | expectedMessage
    ${'username'} | ${null}                 | ${'Username cannot be null'}
    ${'username'} | ${'asd'}                | ${'Must Have min 4 and max 32 char'}
    ${'username'} | ${'a'.repeat(33)}       | ${'Must Have min 4 and max 32 char'}
    ${'email'}    | ${null}                 | ${'Email cannot be null'}
    ${'email'}    | ${'a.com'}              | ${'Email must be valid'}
    ${'email'}    | ${'a.a.com'}            | ${'Email must be valid'}
    ${'email'}    | ${'a@com'}              | ${'Email must be valid'}
    ${'password'} | ${null}                 | ${'Password cannot be null'}
    ${'password'} | ${'P4ssw'}              | ${'Password must have at least 8 char'}
    ${'password'} | ${'lowercase'}          | ${'Password must have at least 1 lowercase and 1 uppercase and 1 number'}
    ${'password'} | ${'UPPERCASE'}          | ${'Password must have at least 1 lowercase and 1 uppercase and 1 number'}
    ${'password'} | ${'UPPERCASElowercase'} | ${'Password must have at least 1 lowercase and 1 uppercase and 1 number'}
    ${'password'} | ${'UPPERCASE12233'}     | ${'Password must have at least 1 lowercase and 1 uppercase and 1 number'}
    ${'password'} | ${'lowercase1234'}      | ${'Password must have at least 1 lowercase and 1 uppercase and 1 number'}
    ${'password'} | ${'1234451212112121'}   | ${'Password must have at least 1 lowercase and 1 uppercase and 1 number'}
  `(
    'returns $expectedMessage when $field is $value',
    async ({ field, value, expectedMessage }) => {
      const user = {
        username: 'user1',
        email: 'user1@mail.com',
        password: '123321',
      };
      user[field] = value;
      const response = await postUser(user);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    }
  );
  // it('returns Message Username cannot be null when username is null', async () => {
  //   const response = await postUser({
  //     email: 'username@email.com',
  //     password: 'Asdf1234',
  //   });
  //   expect(response.body.validationErrors.username).toBe(
  //     'Username cannot be null'
  //   );
  // });

  // it('returns Message Email cannot be null when email is null', async () => {
  //   const response = await postUser({
  //     username: 'user1',
  //     password: 'Asdf1234',
  //   });
  //   expect(response.body.validationErrors.email).toBe('Email cannot be null');
  // });

  // it('returns Password cannot be null when password is null', async () => {
  //   const response = await postUser({
  //     username: 'user1',
  //     email: 'user1@gmail.com',
  //     password: null,
  //   });
  //   expect(response.body.validationErrors.password).toBe(
  //     'Password cannot be null'
  //   );
  // });

  it('returns Errors for both when Email and Username is null', async () => {
    const response = await postUser({
      password: 'Asdf1234',
    });
    const { body } = response;
    expect(Object.keys(body.validationErrors)).toEqual(['username', 'email']);
  });
});
