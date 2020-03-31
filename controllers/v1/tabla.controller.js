const { Tabla } = require('../../models/Tabla');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getTabla(req, res, next) {
  try {
    await Tabla
      .find({})
      .exec((err, tabla) => {
        Tabla.countDocuments((err, count) => {
          if (err) return next(err);
          res.status(200).json({
            "tabla": tabla
          });
        });
      });
  } catch (err) {
    log.error('Ups hubo un error! ' + err);
  }
}
async function postTabla(req, res) {
  try {
    const tabla = new Tabla(req.body);
    await tabla.save(() => {
      res.status(201).json({ mensaje: "Nuevo Dato en tabla agregado con éxito!" });
      log.info("Nuevo Dato en tabla agregado con éxito!");
    });
  } catch (err) {
    log.error('Ups hubo un error!! ' + err);
  }
}

module.exports = {
  getTabla,
  postTabla
};