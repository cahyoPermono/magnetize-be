const Attachments = require("./Attachments");

exports.attachmentPost = async (body) => {
  const attachment = { ...body };
  await Attachments.create(attachment);
};

exports.allAttachmentGet = async () => {
  return await Attachments.findAll();
};

exports.attachmentGet = async (id) => {
  return await Attachments.findOne({ where: { id: id } });
};

exports.attachmentGetbyDepartement = async (id) => {
  return await Attachments.findAll({ where: { DepartementId: id } });
};

exports.attachmentDelete = async (id) => {
  const del = await Attachments.findOne({ where: { id: id } });
  if (del) {
    del.destroy();
  }
};
