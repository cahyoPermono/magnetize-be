const express = require("express");
const AttachmentsService = require("./AttachmentsService");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/api/1.0/attachments",
  check("attachment_name").notEmpty().withMessage("attachment_name_null"),
  check("attachment_file").notEmpty().withMessage("attachment_file_null"),
  check("DepartementId").notEmpty().withMessage("departementID_null"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
      return res.status(400).send({ validationErrors: validationErrors });
    }
    await AttachmentsService.attachmentPost(req.body);
    return res.send({ message: req.t("New_Attachment_create_success") });
  }
);

router.get("/api/1.0/attachments", async (req, res) => {
  const attachments = await AttachmentsService.allAttachmentGet(req.body);
  return res.send({ attachments });
});

router.get("/api/1.0/attachments/:id", async (req, res) => {
  const attachments = await AttachmentsService.attachmentGet(req.params.id);
  if (!attachments) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ attachments });
});

router.get("/api/1.0/attachments/dept/:id", async (req, res) => {
  const data = await AttachmentsService.attachmentGetbyDepartement(req.params.id);
  if (!data[0]) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }  return res.send({ data });
});

router.delete("/api/1.0/attachments/:id", async (req, res) => {
  const checkAttachment = await AttachmentsService.attachmentGet(
    req.params.id
  );
  if (!checkAttachment) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  await AttachmentsService.attachmentDelete(req.params.id);
  return res.send({
    message: `Attachment with id = ${req.params.id} is deleted`,
  });
});

module.exports = router;
