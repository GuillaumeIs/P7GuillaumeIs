//Stockage de l'importation de sequelize
const { Sequelize } = require("sequelize");

//Accès à la base de donnée avec l'ORM sequelize
const sequelize = new Sequelize("groupomania", "root", "", {
      host: "localhost",
      dialect: "mysql",
    }
);

module.exports = sequelize;
