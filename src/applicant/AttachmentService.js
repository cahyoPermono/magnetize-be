const Attachment = require('./Attachment');
const Applicant = require('./Applicant');

const save = async (body) => {
  const attachment = { ...body };
  await Attachment.create(attachment);
};

const save2 = async (applicantId, body) => {
  const attachment = { applicantId: applicantId, ...body };
  await Attachment.create(attachment);
};

const find = async () => {
  const attachment = await Attachment.findAll({
    include: [
      {
        model: Applicant,
        attributes: ['name'],
      },
    ],
  });
  if (attachment) {
    return attachment;
  }

  return false;
};

const byIdApplicant = async (id) => {
  const attachment = await Attachment.findAll({
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
  if (attachment) {
    return attachment;
  }
  return false;
};

module.exports = { save, save2, find, byIdApplicant };
