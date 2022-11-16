const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-creator-node');
const nodemailer = require('nodemailer');
const ApplicantService = require("../applicant/ApplicantService");

const options = {
    format: 'A4',
    orientation: 'potrait',
    border: '10mm'
};

router.get("/api/1.0/download_pdf/:id", async (req, res) => {
    const filename = 'applicantDocs_' + req.params.id + '.pdf';
    fs.readFile('./docs/' + filename, 'base64', ((err, dataPDF) => {
        if (err) {
            res.send({ message: "error !" })
        } else {
            res.send({ dataPDF })
        }
    }));
});

router.get("/api/1.0/topdf/:id", async (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../toPDF/template/temp.html'), 'utf-8');
    const dataApplicant = await ApplicantService.byId(req.params.id);

    const filename = 'applicantDocs_' + dataApplicant.id + '.pdf';

    const dataApplicantPromise = {
        name: dataApplicant.name,
        gender: dataApplicant.gender,
        place_of_birth: dataApplicant.place_of_birth,
        date: dataApplicant.date.toISOString().substring(0, 10).split("-").reverse().join("-"),
        blood_type: dataApplicant.blood_type,
        address: dataApplicant.address,
        postal_code_address: dataApplicant.postal_code_address,
        domicile: dataApplicant.domicile,
        postal_code_domicile: dataApplicant.postal_code_domicile,
        phone: dataApplicant.phone,
        mobile: dataApplicant.mobile,
        office_parent_phone: dataApplicant.office_parent_phone,
        email: dataApplicant.email,
        id_sim_no: dataApplicant.id_sim_no,
        valid_to: dataApplicant.valid_to.toISOString().substring(0, 10).split("-").reverse().join("-"),
        npwp_no: dataApplicant.npwp_no,
        account_no: dataApplicant.account_no,
        religion: dataApplicant.religion,
        position: dataApplicant.position,
        photo: dataApplicant.photo,
        marital_status: dataApplicant.marital_status,
        year_marriage: dataApplicant.year_marriage,
    };

    const families = dataApplicant.families;
    const familiesPromise = []
    families.forEach(element => {
        let args = {
            member: element.member,
            name: element.name,
            gender: element.gender,
            date: element.date.toISOString().substring(0, 10).split("-").reverse().join("-"),
            education: element.education,
            occupation_company: element.occupation_company,
        }
        familiesPromise.push(args)
    });

    const formaleducation = dataApplicant.formaleducations;
    const formaleducationPromise = []
    formaleducation.forEach(element => {
        let args = {
            level: element.level,
            name_location: element.name_location,
            major: element.major,
            entry: element.entry,
            graduate: element.graduate,
        }
        formaleducationPromise.push(args)
    });

    const nonformaleducation = dataApplicant.nonformaleducations;
    const nonformaleducationsPromise = []
    nonformaleducation.forEach(element => {
        let args = {
            course: element.course,
            year: element.year,
            duration: element.duration,
            certificate: element.certificate,
            sponsored_by: element.sponsored_by,
        }
        nonformaleducationsPromise.push(args)
    });

    const computerliterates = dataApplicant.computerliterates;
    const computerliteratesPromise = []
    computerliterates.forEach(element => {
        let args = {
            skill: element.skill,
            level: element.level,
        }
        computerliteratesPromise.push(args)
    });

    const employmenthistories = dataApplicant.employmenthistories;
    const employmenthistoriesPromise = []
    employmenthistories.forEach(element => {
        let args = {
            start: element.start,
            end: element.end,
            name_company: element.name_company,
            position: element.position,
            direct_supervisor: element.direct_supervisor,
            take_home_pay: element.take_home_pay,
            reason_leaving: element.reason_leaving,
        }
        employmenthistoriesPromise.push(args)
    });

    const jobdescriptionPromise = {
        desciption: dataApplicant.jobdescription.description,
    };

    const otherinformationPromise = {
        hospitalized: dataApplicant.otherinformation.hospitalized,
        disease: dataApplicant.otherinformation.disease,
        psycological_test: dataApplicant.otherinformation.psycological_test,
        experience_tellecomunication: dataApplicant.otherinformation.experience_tellecomunication,
        experience_it: dataApplicant.otherinformation.experience_it,
        reason_join: dataApplicant.otherinformation.reason_join,
        reason_hire: dataApplicant.otherinformation.reason_hire,
        opinion_teamwork: dataApplicant.otherinformation.opinion_teamwork,
        plan: dataApplicant.otherinformation.plan,
        respond_target: dataApplicant.otherinformation.respond_target,
        respond_preasure: dataApplicant.otherinformation.respond_preasure,
        reason_leave_last_company: dataApplicant.otherinformation.reason_leave_last_company,
        salary_expect: dataApplicant.otherinformation.salary_expect,
        able_to_start: dataApplicant.otherinformation.able_to_start,
        contact_emergency: dataApplicant.otherinformation.contact_emergency,
        relatives_in_ip: dataApplicant.otherinformation.relatives_in_ip,
        strength: dataApplicant.otherinformation.strength,
        weakness: dataApplicant.otherinformation.weakness,
    };

    const attachmentapplicants = dataApplicant.attachmentapplicants;
    const attachmentapplicantsPromise = []
    attachmentapplicants.forEach(element => {
        let args = {
            type: element.type,
            file: element.file,
        }
        attachmentapplicantsPromise.push(args)
    });

    //dataApplicantPromise, familiesPromise, formaleducationPromise, nonformaleducationsPromise, 
    //computerliteratesPromise, employmenthistoriesPromise, jobdescriptionPromise, otherinformationPromise,
    //attachmentapplicantsPromise

    const document = {
        html: html,
        data: {
            dataApplicantPromise: dataApplicantPromise,
            familiesPromise: familiesPromise,
            formaleducationPromise: formaleducationPromise,
            nonformaleducationsPromise: nonformaleducationsPromise,
            computerliteratesPromise: computerliteratesPromise,
            employmenthistoriesPromise: employmenthistoriesPromise,
            jobdescriptionPromise: jobdescriptionPromise,
            otherinformationPromise: otherinformationPromise,
            attachmentapplicantsPromise: attachmentapplicantsPromise
        },
        path: './docs/' + filename
    }

    await pdf.create(document, options)
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });

    const filepath = 'http://localhost:3000/docs/' + filename;

    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "testing229988@outlook.com",
            pass: "23121ggg"
        }
    });

    const test = {
        from: "testing229988@outlook.com",
        to: "zidnazen@gmail.com",
        subject: "testing",
        text: "Ada pendaftar baru yang mendaftarkan diri, silahkan lihat lamaran pekerjaan berikut ini:",
        attachments: [
            { filename: filename, path: './docs/' + filename }
        ]

    }
    transporter.sendMail(test, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("email send")
            // Send base64 pdf to client
            fs.readFile('./docs/' + filename, 'base64', ((err, dataPDF) => {
                if (err) throw err;
                res.send({
                    filepath: filepath,
                    message: "pdf generated",
                    pdf: dataPDF,
                });
            }))
        };
    });
});

module.exports = router;
