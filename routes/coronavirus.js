const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache') 

const coronavirusController = require('../controllers/v1/coronavirus.controller');

// Ruta mostrar todos los hoteles y agregar hotel
router.route('/coronavirus')
    .get(coronavirusController.getNoticia, cache.get, cache.set)
    .post(coronavirusController.postNoticia)

router.route('/coronavirus/:id')
    .put(coronavirusController.modificarNoticia, cache.clear)

router.route('/coronavirus/borrar')
    .post(coronavirusController.deleteAllNoticia);

module.exports = router;