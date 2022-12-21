const Notes = require("../notes/Notes");
const Attachments = require("../attachments/Attachments");
const Departements = require("./Departements");

exports.departmentPost = async (body) => {
  const departement = { ...body };
  await Departements.create(departement);
};

exports.allDepartmentGet = async () => {
  const data = await Departements.findAll({ include: [Notes, Attachments] });
  return data;
};

exports.departmentGet = async (id) => {
  return await Departements.findOne({
    where: { id: id },
    include: [Notes, Attachments],
  });
};

exports.departementDelete = async (id) => {
  const dataAttach = await Attachments.destroy({
    where: { DepartementId: id },
  });
  const dataNotes = await Notes.destroy({ where: { DepartementId: id } });
  const del = await Departements.findOne({ where: { id: id } });
  if (del) {
    del.destroy();
  }
};
