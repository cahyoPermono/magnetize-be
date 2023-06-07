const app = require('./src/app');
const sequelize = require('./src/config/database');

const sync = (async () => {
    await sequelize.sync({ force: true });
});

app.listen(3005, () => console.log('app is running in port 3005'));
