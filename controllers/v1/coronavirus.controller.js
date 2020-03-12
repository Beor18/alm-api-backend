const { Coronavirus } = require('../../models/Coronavirus');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getNoticia(req, res, next) {
    try {
        await Coronavirus
            .find({})
            .populate('noticias')
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

module.exports = {
    getNoticia,
    postNoticia
};