const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Departements = require("../departements/Departements");

const Model = Sequelize.Model;

class Notes extends Model {}

Notes.init(
  {
    notes: {
      type: Sequelize.STRING,
    },
    DepartementId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "notes",
  }
);

Notes.belongsTo(Departements);
Departements.hasMany(Notes, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Notes;
