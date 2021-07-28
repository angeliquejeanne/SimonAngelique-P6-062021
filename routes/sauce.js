const express = require('express');
//appel méthode router de express
const sauceRouter = express.Router();

//importation authentification
const auth = require('../middleware/auth');
//importation multer pour la gestion des images
const multer = require('../middleware/multer-config');

//importation des controllers sauce
const sauceCtrl = require('../controllers/sauce');

//routes
sauceRouter.post('/', auth, multer, sauceCtrl.createSauce);

sauceRouter.put('/:id', auth, multer, sauceCtrl.modifySauce);

sauceRouter.get('/', auth, sauceCtrl.getAllSauce);

sauceRouter.get('/:id', auth, sauceCtrl.getOneSauce);

sauceRouter.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = sauceRouter;