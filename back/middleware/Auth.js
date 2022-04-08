//Importation jsonwebtoken
const jwt = require("jsonwebtoken");

//Récupération et décryptage du token et vérification de l'identification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const id_uti = decodedToken.id_uti;
    const uti_rang = decodedToken.uti_rang;
    req.auth = { id_uti, uti_rang };
    if (req.body.id_uti && req.body.id_uti !== id_uti)
    { throw "Nom incorrect !"; }
    else
    { next(); }
    } catch {
    res.status(401).json({
    error: new Error("Requête invalide !")
    });
  }
};
