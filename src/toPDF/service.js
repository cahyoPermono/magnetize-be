const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-creator-node');
const nodemailer = require('nodemailer');
const DepartementsService = require("../departements/DepartementsService");

const options = {
    format: 'A4',
    orientation: 'potrait',
    border: '10mm'
}

router.get("/trypdf/:id", async (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../toPDF/template/temp.html'), 'utf-8');
    const filename = 'try_coba_dept' + '.pdf';

    const dataDept = await DepartementsService.departmentGetsss(req.params.id);
    const dataDeptPromise = {
        nama: dataDept.nama,
        url: dataDept.url,
        industri: dataDept.industri,
        lokasi: dataDept.lokasi,
        alamat: dataDept.alamat,
        deskripsi: dataDept.deskripsi,
        avatar: dataDept.avatar,
        createdAt: dataDept.createdAt,
        updatedAt: dataDept.updatedAt,
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
            otherinformation: otherinformation,
            dataDept: dataDeptPromise
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

    // Send base64 pdf to client
    fs.readFile('./docs/' + filename, 'base64', ((err, dataPDF) => {
        if (err) throw err;
        res.send({
            filepath: filepath,
            pdf: dataPDF,
            data: dataDeptPromise
        })
    }))

});
// const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//         user: "testing229988@outlook.com",
//         pass: "23121ggg"
//     }
// });
// const test = {
//     from: "testing229988@outlook.com",
//     to: "zidnazen@gmail.com",
//     subject: "testing",
//     text: "Ada pendaftar baru yang mendaftarkan diri, silahkan lihat lamaran pekerjaan berikut ini:",
//     attachments: [
//         { filename: 'pelamar.pdf', path: './docs/try_coba_dept.pdf' }
//     ]
// }
// transporter.sendMail(test, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("email send")
//         }));
//     }
// })


module.exports = router;

// const applicant = {
//     skills: [
//         {
//             php: [
//                 {
//                     subskill: "CI4",
//                     nilai: 2,
//                     keterangan: 'a'
//                 },
//                 {
//                     subskill: "laravel",
//                     nilai: 2,
//                     keterangan: 'a'
//                 }
//             ],
//             java:[
//                 {
//                     subskill:"maven",
//                     nilai:5,
//                     keterangan:"sadasfa"
//                 },
//             ]
//         }
//     ]
// }