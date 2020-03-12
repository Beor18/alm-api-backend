const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getNoticia(req, res, next) {
    try {
        res.status(200).json({
            status: 'api ok',
            data: {
                titulo: "El gobierno de la Ciudad prohibió los recitales y dispuso que los partidos de fútbol se jueguen sin público"
            }
        });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

module.exports = {
    getNoticia
};