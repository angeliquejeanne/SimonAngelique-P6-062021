//utilisation pour hashage du mot de passe
const bcrypt = require("bcrypt");
//création des token d'identification pour la session
const jwt = require("jsonwebtoken");

//importation du model User
const User = require("../models/User");

//parti inscription user
exports.signUp = (req, res, next) => {
  // il s'agit d'une fonction asynchrone qui va prendre du temps
  //cryptage du mot de passe
  bcrypt.hash(req.body.password, 10)
  //creation user et enregistrement dans le base de donnée
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//parti connection user
exports.login = (req, res, next) => {
    //cherche l'adresse mail dans la bdd
    User.findOne({ email: req.body.email })
      .then(user => {
        //si le user n'est pas dans la bdd
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //si le user est trouvé alors vérification du mot de passe crypté
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            //si le mot de passe ne correspond pas
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            //si le mot de passe corrsepond alors création d'un token d'identification
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    //création d'un token
                    "RANDOM_TOKEN_SECRET",
                    //expire dans 24h
                    { expiresIn: "24h" }
                ),
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };