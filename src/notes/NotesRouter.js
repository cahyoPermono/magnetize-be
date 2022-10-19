const express = require("express");
const NotesService = require("./NotesService");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/api/1.0/notes",
  check("notes").notEmpty().withMessage("notes_null"),
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
    await NotesService.notesPost(req.body);
    return res.send({ message: req.t("newNotes_create_success") });
  }
);

router.get("/api/1.0/notes", async (req, res) => {
  const notes = await NotesService.allNoteGet(req.body);
  return res.send({ notes });
});

router.get("/api/1.0/notes/:id", async (req, res) => {
  const note = await NotesService.noteGet(req.params.id);
  if (!note) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ note });
});

router.get("/api/1.0/notes/dept/:id", async (req, res) => {
  const ressss = await NotesService.noteGetbyDepartement(req.params.id);
  if (!ressss) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ ressss });
});

router.delete("/api/1.0/notes/:id", async (req, res) => {
  const checkNotes = await NotesService.noteGet(req.params.id);
  if (!checkNotes) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  await NotesService.noteDelete(req.params.id);
  return res.send({
    message: `note with id = ${req.params.id} is deleted`,
  });
});

module.exports = router;
