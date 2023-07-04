const ProcessEvaluation = require('./ProcessEvaluation');
const nodemailer = require("nodemailer");
const email = require('../config/emailReceiver');

exports.ProcessEvaluationPost = async (body) => {
  const data = { ...body };
  await ProcessEvaluation.create(data);
  const transporter = nodemailer.createTransport(email.sender);
    const text = `<p><b>Dear HR Imani Prima,</b> <br><br>Diinformasikan bahwa pelamar baru <b>${body.name}</b> yang telah mengisi formulir ke-tiga (evaluasi proses interview).<br><br>Terima Kasih</p>`;
    const subject = "Hasil pengisian Tahap 3 - " + body.name ;
    const test = {
      from: email.sender.auth.user,
      to: email.receiver,
      subject: subject,
      html: text,
    };
    transporter.sendMail(test, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email send");
      }
    });
};

exports.allProcessEvaluationGet = async () => {
    const data = await ProcessEvaluation.findAll();
    return data;
};

exports.ProcessEvaluationGet = async (id) => {
    return await ProcessEvaluation.findOne({
        where: { id: id },
    });
};

exports.ProcessEvaluationDelete = async (id) => {
    const del = await ProcessEvaluation.findOne({ where: { id: id } });
    if (del) {
        del.destroy();
    }
};