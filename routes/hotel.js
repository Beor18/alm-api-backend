const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotel.controller');

// Ruta ver todos los hoteles
router.get('/hoteles', hotelController.getHotel);

// Ruta se agrega hotel
router.post('/hoteles', hotelController.postHotel);

// Ruta ver hotel por id
router.get('/hoteles/:id', hotelController.getHotelPorId);

// Ruta modificar hotel por id
router.put('/hoteles/:id', hotelController.modificarHotel);

// Ruta eliminar hotel por id
router.delete('/hoteles/:id', hotelController.deleteHotel);

// Ruta se agrega habitación
router.post('/hoteles/:id/habitaciones', hotelController.postRooms);

// Ruta /stars/:stars
router.get('/stars/:stars', hotelController.filtroEstrella);

// Ruta eliminar todos los registros
router.post('/hoteles/down', hotelController.deleteAllHotel);


module.exports = router;