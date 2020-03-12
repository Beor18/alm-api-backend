const express = require('express');
const router = express.Router();

const coronavirusController = require('../controllers/v1/coronavirus.controller');

// Ruta mostrar todos los hoteles y agregar hotel
router.route('/coronavirus')
    .get(coronavirusController.getNoticia)
    .post(coronavirusController.postNoticia)
    .put(coronavirusController.modificarNoticia)

router.route('/coronavirus/borrar')
    .post(coronavirusController.deleteAllNoticia);

module.exports = router;