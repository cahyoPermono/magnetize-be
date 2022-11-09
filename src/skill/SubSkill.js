const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Skill = require('./Skill');

const Model = Sequelize.Model;

class SubSkill extends Model {}

SubSkill.init(
  {
    subskill: {
      type: Sequelize.STRING,
    },
    skillId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'subskill',
  }
);
SubSkill.belongsTo(Skill);
Skill.hasMany(SubSkill, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = SubSkill;
