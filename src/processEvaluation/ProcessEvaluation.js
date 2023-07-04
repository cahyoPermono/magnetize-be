const Sequelize = require('sequelize');
const Applicant = require('../applicant/Applicant');
const sequelize = require('../config/database');

// initiate model for extend
const Model = Sequelize.Model;

class processEvaluations extends Model { }

processEvaluations.init(
    {
        interview_1: {
            type: Sequelize.STRING,
        },
        interview_2: {
            type: Sequelize.STRING,
        },
        interview_3: {
            type: Sequelize.STRING,
        },
        comment: {
            type: Sequelize.TEXT('medium'),
        },
        applicantId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'applicant',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'processEvaluations',
    }
);

processEvaluations.belongsTo(Applicant, {
    foreignKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Applicant.hasOne(processEvaluations, {
    foreignKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
module.exports = processEvaluations;
