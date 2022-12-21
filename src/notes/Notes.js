const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Departements = require("../departements/Departements");

const Model = Sequelize.Model;

class Notes extends Model { }

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

Notes.belongsTo(Departements, {
  foreignKey: 'DepartementId',
});
Departements.hasMany(Notes, {
  foreignKey: 'DepartementId',
});

module.exports = Notes;
