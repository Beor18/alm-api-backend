const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache')

const coronavirusController = require('../controllers/v1/coronavirus.controller');
const MapaController = require('../controllers/v1/mapa-argentina.controller');
const TablaController = require('../controllers/v1/tabla.controller');

// Ruta mostrar todos los hoteles y agregar hotel
router.route('/coronavirus')
    .get(coronavirusController.getNoticia, cache.get, cache.set)

router.route('/coronavirus/:id')
    .put(coronavirusController.modificarNoticia, cache.clear)


router.route('/coronavirus/argentina')
    .get(MapaController.getMapa, cache.get, cache.set)
    .post(MapaController.postCaso, cache.clear)

router.route('/coronavirus/argentina/provincia')
    .get(TablaController.getTabla, cache.get, cache.set)
    .post(TablaController.postTabla, cache.clear)
    
// router.route('/coronavirus/borrar')
//     .post(coronavirusController.deleteAllNoticia);

module.exports = router;