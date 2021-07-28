// Ajout du framework express au projet
const express = require('express');
//ajout de body-parser au projet : permet extraction d'objet JSON
const bodyParser = require('body-parser');
//ajout de mongoose au projet : gestion de la DB
const mongoose = require('mongoose');

// Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier.
const path = require('path');

const helmet = require('helmet'); /* récupération du middleware Helmet qui sécurise les appli Express en définissant divers en-têtes HTTP
contient de 9 middlewares de sécurité : csp, hidePowerBy, hsts, ieNoOpen, noCache, noSniff, frameguard, clickjacking, xssFilter*/
require ('dotenv').config();

//importation des fichiers routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

require('dotenv').config();

/* Const de application express */
const app = express();

//connexion à la DB
mongoose.connect('mongodb+srv://anggiie:N6TmGLqdjSJJ7nQa@cluster0.2s4ow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

// ajout d'un middleware, qui sera le premier à être executer par le server, il sera appliquer à toutes les routes, toutes les requêtes envoyer à notre server.
// correction des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // l'origin qui a le droit d'acceder à l'api : tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Authorisation d'utiliser certains en-tête dans l'objet requête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // ceci va permettre à l'application d'accéder à l'api sans problème
    next(); // Ne pas oublie d'appeler next pour passer au middleware d'après
  });

//middleware global : JSON
app.use(bodyParser.json());
//helmet middleware de type connect
app.use(helmet());

//routes
//express doit gérer la ressource image de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
//routes pour les user
app.use('/api/auth', userRoutes); 
//routes pour les sauces
app.use('/api/sauces', sauceRoutes);

//export de l'app express
module.exports = app;