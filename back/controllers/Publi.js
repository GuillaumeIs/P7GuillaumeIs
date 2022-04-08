//Importation du model publication (Publi)
const Publi = require("../models/Publi");

//Affichage des publications publiées
exports.tPublication = (req, res, next) => {
  Publi.findAll()
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(400).json(error))
};

//Affichage d'une publication
exports.unPubli = (req, res, next) => {
  Publi.findByPk(req.params.id_publi)
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(400).json(error))
};

//Permet la création d'une publication
exports.creerPubli = (req, res, next) => {
  //Variable image,
  //si une image à été ajouter
  let image ="";
  if (req.file) { image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
  //Récupération des informations passé par la req body
  const publication = new Publi ({
    id_uti: req.body.id_uti,
    publication: req.body.publication,
    image: image,
    uti_info: req.body.uti_info
  })
  //Création de la publication avec les informations
  publication.save()
  .then((result) => res.status(201).json(result))
  .catch((error) => res.status(400).json(error))
};

//Permet la modification d'une publication
exports.modifPubli = (req, res, next) => {
  Publi.findOne({ where: { id: req.params.id_publi } })
  .then((publi) => {
    //Vérification de l'auteur (auth ou administrateur)
    if (publi.id_uti !== req.auth.id_uti && req.auth.uti_rang !== "administrateur") {
      res.status(403).json(error)
    } else {
    //Stockage des données récupérées 
    const modifPubli = req.file ?
    { ...req.body.publication,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body }
    //Récupération des informations modifié et mise à jour de la publication
    Publi.update({ ...modifPubli, id: req.params.id_publi}, { where: { id: req.params.id_publi }})
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error))
    }
  })
  .catch((error) => res.status(501).json(error))
};

//Permet de supprimer une publication
exports.suppPubli = (req, res, next) => {
  Publi.findOne({ where: { id: req.params.id_publi } })
  .then((publi) => {
    //Vérification de l'auteur (auth ou administrateur)
    if (publi.id_uti !== req.auth.id_uti && req.auth.uti_rang !== "administrateur") {
    res.status(403).json(error);
    } else {
    //Suppresion de la publication
    Publi.destroy({ where: { id: req.params.id_publi }})
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error))
    }
  })
  .catch((error) => res.status(501).json(error));
};
