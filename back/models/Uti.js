//Importation de sequelize
const Sequelize = require("sequelize");
//Importation de l'accés base de donnée
const sequelize = require("../bdd/bdd");

const Utilisateurs = sequelize.define('utilisateurs', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  mdp: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prenom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rang: {
    type: Sequelize.STRING,
    defaultValue: "utilisateur",
  },
},
{
  sequelize,
  timestamps: false
});

module.exports = Utilisateurs;
