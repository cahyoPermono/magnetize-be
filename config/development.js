module.exports = {
  database: {
    database: '',
    username: '',
    password: '',
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
  },
  mail: {
    host: 'localhost',
    port: Math.floor(Math.random() * 2000) + 10000,
    tls: {
      rejectUnauthorized: false,
    },
  },
  uploadDir: 'uploads-test',
  profileDir: 'profile',
};
