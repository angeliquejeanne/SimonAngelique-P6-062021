//importation package http de Node
const http = require('http');
//importation du fichier app.js ()notre application) pour son utilisation sur le serveur
const app = require('./app');
const cors = require('cors');

/* Ajout du package dotenv servant à masquer les informations de connexion à la base de donnée */
require('dotenv').config();

//renvoit un port valide sous forme de chaine ou de numéro
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

//configure le serveur : soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut || soit le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Cherche erreur et les gère, les enregistre ensuite dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

// création du serveur à partir du fichier app.js
const server = http.createServer(app);

//configuration du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  //un écouteur d'évènements est également enregistré
  //consignant le port ou le canal sur lequel le serveur s'exécute dans la console
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
app.use(cors());

//mise en route du serveur
//configuration du serveur pour qu'il écoute la variable d'environnement du port par défaut ou 3000
server.listen(port);
