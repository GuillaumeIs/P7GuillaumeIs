//Importation de bcrypt
const bcrypt = require("bcrypt");
//Importation de jsonwebtoken
const jwt = require("jsonwebtoken");

//Importation du model Utilisateur (Uti)
const Uti = require("../models/Uti");

//Affichage des données utilisateur
exports.Uti = (req, res, next) => {
  Uti.findOne({
    where: { id: req.params.id_uti }
  })
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(400).json(error))
};

//Permet l'inscription d'un nouveau compte
exports.inscription = (req, res, next) => {
	bcrypt.hash(req.body.mdp, 10, (error, hash) => {
    //Récupére et stocke les données passé par req body
    const uti = {
      email: req.body.email,
      mdp: hash,
      nom: req.body.nom,
      prenom: req.body.prenom,
    }
    //Liaison des données stocké avec le module create
    //pour créer le nouvelle utilisateur
	Uti.create(uti)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error))
	})
};

//Permet la connexion d'un compte
exports.connexion = (req, res, next) => {
  Uti.findOne({
    where: { email: req.body.email },
  })
  .then((uti) => {
    if (uti == false) {
      res.status(404).json(error);
    }
    bcrypt.compare(req.body.mdp, uti.mdp)
    .then((bMdp) => {
    if (bMdp == false) {
      return res.status(403).json(error);
    }
    res.status(200).json({
    id_uti: uti.id,
    uti_rang: uti.rang,
    token: jwt.sign({ id_uti: uti.id, uti_rang: uti.rang },
    "RANDOM_TOKEN_SECRET", { expiresIn: "24h", }),
    });
    })
    .catch((error) => res.status(500).json(error))
    }
  );
};

//Permet la suppresion d'un compte
exports.suppCompte = (req, res, next) => {
	Uti.destroy({
    where: { id: req.params.id_uti }
  })
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(500).json(error))
};
