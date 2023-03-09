const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./Applicant');
const Model = Sequelize.Model;

class ApplicantAuths extends Model { }

ApplicantAuths.init(
    {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        ApplicantId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'applicants',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'applicantauths',
    }
);

module.exports = ApplicantAuths;
