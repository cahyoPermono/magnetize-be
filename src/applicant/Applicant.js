const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Jobs = require('../skill/Job');
const ApplicantAuths = require('./ApplicantAuths');
const ApplicantStatus = require('../applicantStatus/ApplicantStatus');

// initiate model for extend
const Model = Sequelize.Model;

class Applicant extends Model { }

Applicant.init(
  {
    ApplicantAuthId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'applicantauths',
        key: 'id',
      },
    },
    ApplicantStatusId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'applicantstatus',
        key: 'id',
      },
    },
    name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.ENUM('L', 'P'),
    },
    place_of_birth: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    blood_type: {
      type: Sequelize.ENUM('A', 'B', 'AB', 'O'),
    },
    province: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    district: {
      type: Sequelize.STRING,
    },
    subdistrict: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    postal_code_address: {
      type: Sequelize.INTEGER,
    },
    province_dom: {
      type: Sequelize.STRING,
    },
    city_dom: {
      type: Sequelize.STRING,
    },
    district_dom: {
      type: Sequelize.STRING,
    },
    subdistrict_dom: {
      type: Sequelize.STRING,
    },
    domicile: {
      type: Sequelize.STRING,
    },
    postal_code_domicile: {
      type: Sequelize.INTEGER,
    },
    phone: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    office_parent_phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    npwp_no: {
      type: Sequelize.STRING,
    },
    account_no: {
      type: Sequelize.STRING,
    },
    religion: {
      type: Sequelize.STRING,
    },
    JobId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'jobs',
        key: 'id',
      },
    },
    photo: {
      type: Sequelize.TEXT('long'),
    },
    marital_status: {
      type: Sequelize.STRING,
    },
    year_marriage: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    isCandidate: {
      type: Sequelize.BOOLEAN,
    },
    ktp_no: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'applicant',
  }
);
Applicant.belongsTo(Jobs, {
  foreignKey: 'JobId',
});
Jobs.hasMany(Applicant, {
  foreignKey: 'JobId',
});

Applicant.belongsTo(ApplicantAuths, {
  foreignKey: 'ApplicantAuthId',
});
ApplicantAuths.hasOne(Applicant, {
  foreignKey: 'ApplicantAuthId',
});


Applicant.belongsTo(ApplicantStatus, {
  foreignKey: 'ApplicantStatusId',
});
ApplicantStatus.hasMany(Applicant, {
  foreignKey: 'ApplicantStatusId',
});

module.exports = Applicant;
