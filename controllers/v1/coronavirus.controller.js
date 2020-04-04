const { Coronavirus } = require('../../models/Coronavirus');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)
const moment = require('moment-timezone');
require('mongodb-moment')(moment);


async function getNoticia(req, res, next) {
    try {
        const findNoticia = await Coronavirus.find({});
        const countNoticia = await Coronavirus.countDocuments((count) => count);

        return res.status(200).json({
            status: 'api ok',
            data: findNoticia,
            total: countNoticia
        });       
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

async function modificarNoticia(req, res) {
    try {
        const { id } = req.params;
        await Coronavirus.updateOne({ _id: id }, {
            date: moment(new Date()).tz('America/Argentina/Buenos_Aires').format('HH:mm'),
            titulo: req.body.titulo,
            confirmados: req.body.confirmados,
            total_mundo: req.body.total_mundo,
            recuperados: req.body.recuperados,
            fallecidos: req.body.fallecidos,
            activos: req.body.confirmados - req.body.recuperados - req.body.fallecidos
        });
        res.status(200).json('Modificado con éxito!')
        log.warn('Modificado con éxito!');
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }

}

async function deleteAllNoticia(req, res) {
    try {
        await Coronavirus.deleteMany({}, (err) => {
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

module.exports = {
    getNoticia,
    modificarNoticia,
    deleteAllNoticia
};