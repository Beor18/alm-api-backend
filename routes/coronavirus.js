const express = require('express');
const router = express.Router();

const coronavirusController = require('../controllers/v1/coronavirus.controller');

// Ruta mostrar todos los hoteles y agregar hotel
router.route('/coronavirus')
    .get(coronavirusController.getNoticia)
    .post(coronavirusController.postNoticia);

module.exports = router;