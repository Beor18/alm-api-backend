const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getNoticia(req, res, next) {
    try {
        res.status(200).json({
            status: 'api ok',
            data: {
                titulo: "Jujuy suspendió las clases por dos semana"
            }
        });
    } catch (err) {
        log.error('Ups hubo un error! ' + err);
    }
}

module.exports = {
    getNoticia
};