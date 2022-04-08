//Importation de sequelize
const Sequelize = require("sequelize");
//Importation de l'accés base de donnée
const sequelize = require("../bdd/bdd");

const Publications = sequelize.define('publications', {
  id_uti: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  publication: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uti_info: {
    type: Sequelize.STRING,
    allowNull: false
  },
},
{
  sequelize,
  timestamps: false
});

module.exports = Publications;
