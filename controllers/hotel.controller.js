const { Hotel, Room } = require('../models/Hotel');

const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getHotel(req, res, next) {
    try {
        await Hotel
            .find({})
            .populate('rooms')
            .exec((err, hotels) => {
                Hotel.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        status: 'api ok',
                        hotels,
                        total: count
                    });
                });
            });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

async function getHotelPorId(req, res, next) {
    try {
        await Hotel
            .findById(req.params.id)
            .populate('rooms')
            .exec((err, hotel) => {
                if (hotel) {
                    Hotel.countDocuments((err) => {
                        if (err) return next(err);
                        res.status(200).json({
                            status: 'api ok',
                            hotel,
                        });
                    });
                } else {
                    return res.status(404).json({mensaje: 'No encontrado!'});
                }
            });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

async function modificarHotel(req, res) {
    try {
        const { id } = req.params;
        await Hotel.updateOne({ _id: id }, req.body);
        res.status(200).json('Hotel Modificado con éxito!')
        log.warn('Hotel Modificado con éxito!');
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }

}

async function postHotel(req, res) {
    try {
        const hotel = new Hotel({
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            stars: req.body.stars,
            image: req.body.image,
            price: req.body.price,
            amenities: req.body.amenities
        });
        await hotel.save(() => {
            res.status(201).json({mensaje: "Hotel agregado con éxito!"});
            log.info("Hotel agregado con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }
}

async function postRooms(req, res) {
    try {
        const { id } = req.params;
		const newRoom = new Room(req.body);
		const hotel = await Hotel.findById(id);
		newRoom.hotel = hotel;
		await newRoom.save();
		hotel.rooms.push(newRoom);
		await hotel.save(() => {
            res.status(201).json({mensaje: 'Habitación agregado con éxito al Hotel!'});
            log.info('Habitación agregado con éxito al Hotel!');
        });
    } catch (err) {
        log.error('Ups hubo un error!!' + err);
    }
}

async function deleteHotel(req, res) {
    try {
        await Hotel.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(200).json({
                    mensaje: 'Hotel Borrado con éxito!'
                });
                log.error('Hotel Borrado con éxito!')
            }
        });
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }
}

// Eliminar todos los registros - NO TOCAR

async function deleteAllHotel(req, res) {
    try {
        await Hotel.deleteMany({}, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(200).json({
                    mensaje: 'Registros Borrado con éxito!'
                });
                log.warn('Registros Borrado con éxito!')
            }
        });
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }
}

async function filtroEstrella(req, res) {
    try {
        await Hotel.find({'stars': req.params.stars}, (err, hotel) => {
            if (hotel <= null) {
                return res.status(404).json({
                    mensaje: 'No encontrado!',
                    hotels: hotel,
                    err
                });
            } else {
                res.status(200).json({
                    status: 'Todo ok',
                    hotels: hotel
                });
            }
        })
    } catch (err) {
        log.error('Ups hubo un error!');
    }
}

module.exports = {
    getHotel,
    getHotelPorId,
    modificarHotel,
    postHotel,
    deleteHotel,
    deleteAllHotel,
    filtroEstrella,
    postRooms
};