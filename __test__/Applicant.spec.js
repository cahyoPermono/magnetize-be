const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const Applicant = require('../src/applicant/Applicant');
const Family = require('../src/applicant/Family');
const FormalEducation = require('../src/applicant/FormalEducation');
const NonFormalEducation = require('../src/applicant/NonFormalEducation');
const ComputerLiterate = require('../src/applicant/ComputerLiterate');
const EmploymentHistory = require('../src/applicant/EmploymentHistory');
const JobDescription = require('../src/applicant/JobDescription');
const OtherInformation = require('../src/applicant/OtherInformation');
const Attachment = require('../src/applicant/Attachment');

beforeAll(() => {
  return sequelize.sync();
});

// beforeEach(() => {
//   return Family.destroy({
//     truncate: true,
//   }),
//   FormalEducation.destroy({
//     truncate: true,
//   }),
//   NonFormalEducation.destroy({
//     truncate: true,
//   }),
//   EmploymentHistory.destroy({
//     truncate: true,
//   }),
//   ComputerLiterate.destroy({
//     truncate: true,
//   }),
//   JobDescription.destroy({
//     truncate: true,
//   }),
//   Attachment.destroy({
//     truncate: true,
//   }),
//   Applicant.destroy({
//     truncate: true,
//   });

// });

const validApplicant = {
  applicant: {
    name: 'applicant1',
    gender: 'L',
    place_of_birth: 'Jakarta',
    date: '01-01-1997',
    blood_type: 'O',
    address: 'Cilandak Timur',
    postal_code_address: '12345',
    domicile: 'Jl.Melati',
    postal_code_domicile: '13426',
    phone: '075112345',
    mobile: '081234567890',
    office_parent_phone: '',
    email: 'applicant1@mail.com',
    id_sim_no: '01023415698127516',
    valid_to: '',
    npwp_no: '01023415698127516',
    account_no: '1234567890',
    religion: 'Islam',
    position: 'Position 1',
    photo: 'applicant1.jpg',
    marital_status: 'Menikah',
    year_marriage: '2021',
  },
  family: [
    {
      member: 'Ayah',
      name: 'Anto',
      gender: 'L',
      date: '01-12-1965',
      education: 'D2',
      occupation_company: 'Pensiun',
    },
    {
      member: 'Ibu',
      name: 'Ani',
      gender: 'P',
      date: '01-12-1965',
      education: 'D2',
      occupation_company: 'Pensiun',
    },
  ],
  formaleducation: {
    level: 'Diploma 3',
    name_location: 'politeknik Padang',
    major: 'TI',
    entry: '2018',
    graduate: '2021',
  },
  nonformaleducation: [
    {
      course: 'Web',
      year: '2020',
      duration: '3 bulan',
      certificate: 'certificate',
      sponsored_by: 'Skill Academy',
    },
  ],
  computerliterate: [
    {
      skill: 'PHP',
      level: 'Cukup',
    },
  ],
  employmenthistory: [
    {
      start: 'Juni 2022',
      end: 'Juli 2022',
      name_company: 'PT ABC',
      position: 'Admin',
      direct_supervisor: 'Bpk. Aldi',
      take_home_pay: '2.000.000',
      reason_leaving: 'Masalah Pribadi',
    },
  ],
  jobdescription: {
    description: 'Create App',
  },
  otherinformation: {
    hospitalized: 'Ya',
    disease: 'Tifus',
    psycological_test: '24-06-2022',
    experience_tellecomunication: '0',
    experience_it: '0',
    reason_join: 'Ingin Bekerja',
    reason_hire: 'Saya tekun',
    opinion_teamwork: 'Teamwork penting',
    plan: 'S1',
    respond_target: 'Target meningkatkan semangat',
    respond_preasure: 'Tekanan sedikit menantang',
    reason_leave_last_company: 'Lingkungan kerja tidak baik',
    salary_expect: '4.000.000',
    able_to_start: 'Secepatnya',
    contact_emergency: '082113456789',
    relatives_in_ip: 'Tidak Ada',
    strength: 'rajin, tekun, disiplin',
    weakness: 'lupa, bosan, takut',
  },
  attachment: [
    {
      type: 'KTP',
      file: 'ktp',
    },
  ],
};

describe('Submit data and get data applicant', () => {
  const postApplicant = (dataApply = validApplicant) => {
    return request(app).post('/api/1.0/applicants').send(dataApply);
  };

  it('returns 200 OK when submit data applicant is valid', async () => {
    const response = await postApplicant();
    expect(response.status).toBe(200);
  });

  it('returns success message when input data applicant is valid', async () => {
    const response = await postApplicant();
    expect(response.body.message).toBe('Success Save Data');
  });

  it('save data applicant to table applicant', async () => {
    await postApplicant();
    const applicant = await Applicant.findAll();
    const family = await Family.findAll();
    const formaleducation = await FormalEducation.findAll();
    const nonformaleducation = await NonFormalEducation.findAll();
    const computerliterate = await ComputerLiterate.findAll();
    const employmenthistory = await EmploymentHistory.findAll();
    const jobdescription = await JobDescription.findAll();
    const otherinformation = await OtherInformation.findAll();
    const attachment = await Attachment.findAll();
    expect(applicant.length).toBeGreaterThan(0);
    expect(family.length).toBeGreaterThan(0);
    expect(formaleducation.length).toBeGreaterThan(0);
    expect(nonformaleducation.length).toBeGreaterThan(0);
    expect(computerliterate.length).toBeGreaterThan(0);
    expect(employmenthistory.length).toBeGreaterThan(0);
    expect(jobdescription.length).toBeGreaterThan(0);
    expect(otherinformation.length).toBeGreaterThan(0);
    expect(attachment.length).toBeGreaterThan(0);
  });
});

describe('Get all data applicant', () => {
  const getAllApplicant = (applicant = validApplicant) => {
    return request(app).get('/api/1.0/applicants').send(applicant);
  };

  it('Return status 200 OK when success get data all applicant', async () => {
    const response = await getAllApplicant();
    expect(response.status).toBe(200);
  });

  it('Return message when success get data all applicant', async () => {
    const response = await getAllApplicant();
    expect(response.body.message).toBe('Success Get Data Applicant');
  });

  describe('Get data applicant by ID', () => {
    const getApplicantById = (applicant = validApplicant) => {
      return request(app).get('/api/1.0/applicants/1').send(applicant);
    };

    it('Return status 200 OK when success get data applicant by ID', async () => {
      const response = await getApplicantById();
      expect(response.status).toBe(200);
    });

    it('Return message when success get data applicant by ID', async () => {
      const response = await getApplicantById();
      expect(response.body.message).toBe('Success Get Data Applicant by Id');
    });
  });
});
