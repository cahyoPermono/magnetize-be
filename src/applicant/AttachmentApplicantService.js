const AttachmentApplicant = require('./AttachmentApplicant');
const Applicant = require('./Applicant');

const save = async (body) => {
  const attachmentapplicant = { ...body };
  await AttachmentApplicant.create(attachmentapplicant);
};

const save2 = async (applicantId, body) => {
  const attachmentapplicant = { applicantId: applicantId, ...body };
  await AttachmentApplicant.create(attachmentapplicant);
};

const find = async () => {
  const attachmentapplicant = await AttachmentApplicant.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (attachmentapplicant) {
    return attachmentapplicant;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const attachmentapplicant = await AttachmentApplicant.findAll({
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
  if (attachmentapplicant) {
    return attachmentapplicant;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
