const Notes = require("./Notes");

exports.notesPost = async (body) => {
  const notes = { ...body };
  await Notes.create(notes);
};

exports.allNoteGet = async () => {
  return await Notes.findAll();
};

exports.noteGet = async (id) => {
  return await Notes.findOne({ where: { id: id } });
};

exports.noteGetbyDepartement = async (id) => {
  return await Notes.findAll({ where: { DepartementId: id } });
};

exports.noteDelete = async (id) => {
  const del = await Notes.findOne({ where: { id: id } });
  if (del) {
    del.destroy();
  }
};


