const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Departements = require("../departements/Departements");

const Model = Sequelize.Model;

class Attachments extends Model { }

Attachments.init(
  {
    attachment_name: {
      type: Sequelize.STRING,
    },
    attachment_file: {
      type: Sequelize.TEXT("long"),
    },
    type: {
      type: Sequelize.STRING,
    },
    DepartementId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "attachments",
  }
);
Attachments.belongsTo(Departements, {
  foreignKey: 'DepartementId',
});
Departements.hasMany(Attachments, {
  foreignKey: 'DepartementId',
});

module.exports = Attachments;
