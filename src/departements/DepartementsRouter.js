const express = require("express");
const DepartementsService = require("./DepartementsService");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-creator-node');

const options = {
  format: 'A4',
  orientation: 'potrait',
  border: '10mm'
}
router.post(
  "/api/1.0/departements",
  check("nama")
    .notEmpty()
    .withMessage("nama_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("nama_size"),
  check("url").notEmpty().withMessage("url_null"),
  check("industri")
    .notEmpty()
    .withMessage("industri_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("industri_size"),
  check("lokasi")
    .notEmpty()
    .withMessage("lokasi_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("lokasi_size"),
  check("alamat")
    .notEmpty()
    .withMessage("alamat_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("alamat_size"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
      return res.status(400).send({ validationErrors: validationErrors });
    }
    await DepartementsService.departmentPost(req.body);
    return res.send({ message: req.t("newDeparement_create_success") });
  }
);

router.get("/api/1.0/departements", async (req, res) => {
  const departements = await DepartementsService.allDepartmentGet(req.body);
  return res.send({ departements });
});

router.get("/trypdf", async (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, '../toPDF/template/temp.html'), 'utf-8');
  const filename = 'try_coba' + '.pdf';
  const dataApplicant = [{
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
    attachment: [
      {
        type: 'KTP',
        file: 'ktp',
      },
    ],
  }];

  const computerliterate = [
    {
      skill: 'PHP',
      level: 'Cukup',
    },
    {
      skill: 'Laravel',
      level: 'baik',
    },
    {
      skill: 'HTML',
      level: 'kurang',
    },
  ];
  const nonformaleducation = [
    {
      course: 'Web',
      year: '2020',
      duration: '3 bulan',
      certificate: 'certificate',
      sponsored_by: 'Skill Academy',
    },
    {
      course: 'Database Oracle',
      year: '2021',
      duration: '6 bulan',
      certificate: 'certificate',
      sponsored_by: 'Shopee',
    },
  ];
  const formaleducation = [{
    level: 'Diploma 3',
    name_location: 'politeknik Padang',
    major: 'TI',
    entry: '2018',
    graduate: '2021',
  },
  {
    level: 'Sarjana (S1)',
    name_location: 'Universitas Negri Semarang',
    major: 'TI',
    entry: '2021',
    graduate: '2023',
  }];
  const employmenthistory = [
    {
      start: 'Juni 2022',
      end: 'Juli 2022',
      name_company: 'PT ABC',
      position: 'Admin',
      direct_supervisor: 'Bpk. Aldi',
      take_home_pay: '2.000.000',
      reason_leaving: 'Masalah Pribadi',
    },
    {
      start: 'Juni 2021',
      end: 'Juni 2022',
      name_company: 'PT ABDDDDD',
      position: 'Admin',
      direct_supervisor: 'Bpk. Aldo F.',
      take_home_pay: '2.100.000',
      reason_leaving: 'Masalah Pribadi',
    },
  ];
  const family = [
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
    {
      member: 'Anak 1',
      name: 'Anindya',
      gender: 'P',
      date: '01-12-1980',
      education: 'D2',
      occupation_company: 'Pensiun',
    },
    {
      member: 'Anak 2',
      name: 'Putra',
      gender: 'L',
      date: '01-12-2000',
      education: 'D4',
      occupation_company: 'Pensiun',
    },
    {
      member: 'Suami / Istri',
      name: 'Ambari',
      gender: 'L',
      date: '01-12-1988',
      education: 'D4',
      occupation_company: 'Pensiun',
    },
  ];
  const jobdescription = {
    description: 'Membuat aplikasi untuk mendeteksi penyakit tenggorokan berbahaya dan menyelamatkan bumi dari monster bawah laut',
  };
  const otherinformation = {
    hospitalized: 'Ya',
    disease: 'Tifus',
    psycological_test: '24-06-2022',
    experience_tellecomunication: '5',
    experience_it: '15',
    reason_join: 'Ingin Bekerja bersama tim hebat',
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
  };

  const document = {
    html: html,
    data: {
      a: dataApplicant,
      family: family,
      formaleducation: formaleducation,
      nonformaleducation: nonformaleducation,
      computerliterate: computerliterate,
      employmenthistory: employmenthistory,
      jobdescription: jobdescription,
      otherinformation: otherinformation
    },
    path: './docs/' + filename
  }

  pdf.create(document, options)
    .then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });

  const filepath = 'http://localhost:3000/docs/' + filename;

  res.send({
    path: filepath
  });
});

router.get("/api/1.0/departements/:id", async (req, res) => {
  const departement = await DepartementsService.departmentGet(req.params.id);
  if (!departement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ departement });
});

router.delete("/api/1.0/departements/:id", async (req, res) => {
  const checkDdepartement = await DepartementsService.departmentGet(
    req.params.id
  );
  if (!checkDdepartement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  } else {
    await DepartementsService.departementDelete(req.params.id);
    return res.send({
      message: req.t(`departement with id ${req.params.id} deleted`),
    });
  }
});

module.exports = router;
