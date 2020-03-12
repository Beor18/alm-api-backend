const { Coronavirus } = require('../../models/Coronavirus');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getNoticia(req, res, next) {
    try {
        await Coronavirus
            .find({})
            .exec((err, data) => {
                Coronavirus.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        status: 'api ok',
                        data,
                        total: count
                    });
                });
            });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}
async function postNoticia(req, res) {
    try {
        const coronavirus = new Coronavirus(req.body);
        await coronavirus.save(() => {
            res.status(201).json({mensaje: "Noticia agregado con éxito!"});
            log.info("Noticia agregado con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error!! ' + err);
    }
}

async function modificarNoticia(req, res) {
    try {
        const { id } = req.params;
        await Coronavirus.updateOne({ _id: id }, req.body);
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
    postNoticia,
    modificarNoticia,
    deleteAllNoticia
};