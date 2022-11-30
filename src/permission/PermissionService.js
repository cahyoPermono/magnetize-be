const Permission = require("./Permission");

const save = async (body) => {
  const permission = { ...body };
  await Permission.create(permission);
};

module.exports = { save };
