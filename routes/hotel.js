const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/v1/hotel.controller');

// Ruta mostrar todos los hoteles y agregar hotel
router.route('/hoteles')
    .get(hotelController.getHotel)
    .post(hotelController.postHotel);

// Ruta hoteles por id - Mostrar - Modificar - Eliminar
router.route('/hoteles/:id')
    .get(hotelController.getHotelPorId)
    .put(hotelController.modificarHotel)
    .delete(hotelController.deleteHotel);

// Ruta agregar habitaciones a un hotel especifico
router.route('/hoteles/:id/habitaciones')
    .post(hotelController.postRooms);

// Ruta filtro estrellas
router.route('/stars/:stars')
    .get(hotelController.filtroEstrella);

// Ruta eliminar todos los registros
router.route('/hoteles/down')
    .post(hotelController.deleteAllHotel);

module.exports = router;