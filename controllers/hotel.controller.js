const Hotel = require('../models/Hotel');

const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getHotel(req, res, next) {
    try {
        req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1

        Hotel
            .find({})
            .exec((err, hotels) => {
                Hotel.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.json({
                        ok: true,
                        hotels,
                        cuantos: count
                    });
                });
            });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

async function getHotelPorId(req, res) {
    try {
        Hotel.findById(req.params.id, function(err, hotel) {
            //if (err) return next(err);
            res.json({
                hotel
            });
        });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

async function modificarHotel(req, res) {
    try {
        const { id } = req.params;
        await Hotel.update({ _id: id }, req.body);
        res.send('Hotel Modificado con éxito!')
        log.warn('Hotel Modificado con éxito!');
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }

}

async function postHotel(req, res) {
    try {
        const hotel = new Hotel({
            name: req.body.name,
            stars: req.body.stars,
            image: req.body.image,
            price: req.body.price,
            amenities: req.body.amenities
        });
        await hotel.save(() => {
            res.send("Hotel agregado con éxito!");
            log.info("Hotel agregado con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }
}

async function deleteHotel(req, res) {
    try {
        Hotel.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.json({
                    mensaje: 'Hotel Borrado con éxito!'
                });
                log.error('Hotel Borrado con éxito!')
            }
        });
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }
}

async function filtroEstrella(req, res) {
    try {
        Hotel.find({'stars': req.params.stars}, (err, hotel) => {
            if (err) {
                return res.send(err);
            } else {
                res.json(hotel);
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
    filtroEstrella
};