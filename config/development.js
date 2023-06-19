module.exports = {
  database: {
    database: 'magnetize_test',
    username: 'root',
    password: '11223344',
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
