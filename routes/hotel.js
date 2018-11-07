const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotel.controller');

// Ruta /hoteles
router.get('/hoteles', hotelController.getHotel);

// Ruta /hotel/agregar
router.post('/hotel/agregar', hotelController.postHotel);

// Rutas /hotel/ver/:id
router.get('/hotel/ver/:id', hotelController.getHotelPorId);

// Rutas /hotel/modificar/:id
router.post('/hotel/modificar/:id', hotelController.modificarHotel);

// Rutas /hotel/delete/:id
router.delete('/hotel/delete/:id', hotelController.deleteHotel);

// Ruta /stars/:stars
router.get('/stars/:stars', hotelController.filtroEstrella);


module.exports = router;