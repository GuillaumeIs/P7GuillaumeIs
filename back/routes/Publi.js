//Importation Express
const express = require("express");
//Importation router Express dans une variable (router)
const router = express.Router();

//Importation des middlewares correspondants
const auth = require("../middleware/Auth");
const multer = require("../middleware/multerConfig");

//Importation controllers Publication (Publi)
const publiCTRL = require("../controllers/Publi");

//Contient les routes permettant l'ajout, la modification et la suppression d'une publication
//Méthode CRUD (créer, lire, modifier, supprimer)
router.post("/api/publica", auth, multer, publiCTRL.creerPubli);
router.get("/api/publica/:id_publi", auth, publiCTRL.unPubli);
router.put("/api/publica/:id_publi", auth, multer, publiCTRL.modifPubli);
router.delete("/api/publica/:id_publi", auth, publiCTRL.suppPubli);
router.get("/api/publica", auth, publiCTRL.tPublication);

module.exports = router;
