const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;

class ApplicantStatus extends Model { }

ApplicantStatus.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.STRING,
        }
    },
    {
        sequelize,
        freezeTableName:true,
        timestamps:true,
        modelName: "applicantstatus",
    }   
);

module.exports = ApplicantStatus;
