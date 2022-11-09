const OtherInformation = require('./OtherInformation');
const Applicant = require('./Applicant');

const save = async (body) => {
  const otherinformation = { ...body };
  await OtherInformation.create(otherinformation);
};

const save2 = async (applicantId = Applicant.id, body) => {
  const otherinformation = { applicantId: applicantId, ...body };
  await OtherInformation.create(otherinformation);
};

const find = async () => {
  const otherinformation = await OtherInformation.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (otherinformation) {
    return otherinformation;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const otherinformation = await OtherInformation.findAll({
    where: {
      applicantId: id,
    },
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (otherinformation) {
    return otherinformation;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
