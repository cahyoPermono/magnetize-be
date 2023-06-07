const ApplicantStatus = require("./ApplicantStatus");

exports.applicantStatusPost = async (body) => {
    const applicantStatus = { ...body };
    await ApplicantStatus.create(applicantStatus);
};

exports.allApplicantGet = async () => {
    return await ApplicantStatus.findAll();
};

exports.applicantStatusGet = async (id) => {
    return await ApplicantStatus.findOne({ where: { id: id } });
};

exports.applicantStatusGetbyDepartement = async (id) => {
    return await ApplicantStatus.findAll({ where: { ApplicantId: id } });
};

exports.applicantStatusDelete = async (id) => {
    const del = await ApplicantStatus.findOne({ where: { id: id } });
    if (del) {
        del.destroy();
    }
};

exports.applicantStatusUpdate = async (body, id) => {
    const data = { ...body };
    await ApplicantStatus.update(data, { where: { id: id } });
};