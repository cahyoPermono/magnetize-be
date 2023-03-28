const ApplicantAuths = require("./ApplicantAuths");
const bcrypt = require("bcrypt");
const Applicant = require("./Applicant");
const Job = require("../skill/Job");

exports.save = async (body) => {
    const hash = await bcrypt.hash(body.password, 10);
    const user = { ...body, password: hash };
    await ApplicantAuths.create(user);
};

exports.login = async (email) => {
    const user = await ApplicantAuths.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return user;
    } else {
        return ({ message: 'tidak ada' })
    }
};

exports.findByEmail = async (email) => {
    return await ApplicantAuths.findOne({ where: { email: email } });
};

exports.allApplicantAuth = async () => {
    return await ApplicantAuths.findAll({
        include: [Applicant]
    });
};

exports.ApplicantAuthGet = async (id) => {
    return await ApplicantAuths.findOne({
        where: { id: id }, include: [{ model: Applicant, include: [Job] }]
    });
};

exports.ApplicantAuthDelete = async (id) => {
    const del = await ApplicantAuths.findOne({ where: { id: id } });
    if (del) {
        del.destroy();
    }
};

exports.ApplicantAuthUpdate = async (applicantId, authId) => {
    return await ApplicantAuths.update({ ApplicantId: applicantId }, { where: { id: authId } });
}