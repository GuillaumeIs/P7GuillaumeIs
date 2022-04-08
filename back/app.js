//Importation Express
const express = require("express");
//Importation cors (Module autorisation partage de ressource)
const cors = require("cors");
//Importation path (Module chemin de l'image)
const path = require("path");
//Importation des routes correspondants
const reqUti = require("./routes/Uti");
const reqPubli = require("./routes/Publi");
//Importation de l'accès la base de donnée (bdd)
const sequelize = require("./bdd/bdd");

try {
    sequelize.authenticate()
    .then(() => console.log("Accès à la base de donnée réussi"))
    .catch((err) => console.log(err));
    } catch (e) {
    console.error("Non connecté à la base de donnée -", e);
}

//Stockage Express dans une variable const (app)
const app = express();
//Autorisation partage de ressource
app.use(cors());
//Accès au corps de la requête
app.use(express.json());
//Accès à la route correspondante
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", reqUti);
app.use("/", reqPubli);

module.exports = app;
