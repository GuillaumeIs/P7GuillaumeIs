//Importation Express
const express = require("express");
//Importation router Express dans une variable (router)
const router = express.Router();

//Importation des middlewares correspondants
const auth = require("../middleware/Auth");

//Importation controllers Utilisateur (Uti)
const utiCTRL = require("../controllers/Uti");

//Contient les routes permettant l'inscription (inscription) l'authentification (connexion)
//et la suppression d'un compte (suppCompte)
router.post("/api/auth/inscription", utiCTRL.inscription);
router.post("/api/auth/connexion", utiCTRL.connexion);
router.delete("/api/auth/:id_uti", auth, utiCTRL.suppCompte);
//Importations des informations de l'utilisateurs
router.get("/api/uti", auth, utiCTRL.Uti);

module.exports = router;
