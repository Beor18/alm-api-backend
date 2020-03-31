const { Mapa } = require('../../models/Mapa');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)
const moment = require('moment-timezone');
require('mongodb-moment')(moment);


async function getMapa(req, res, next) {
  try {
    await Mapa
      .find({})
      .exec((err, features) => {
        Mapa.countDocuments((err, count) => {
          if (err) return next(err);
          res.status(200).json([{
            "type": "FeatureCollection",
            "features": features
          }]);
        });
      });
  } catch (err) {
    log.error('Ups hubo un error! ' + err);
  }
}
async function postCaso(req, res) {
  try {
    const mapa = new Mapa({
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates:req.body.coordinates.split(',').map(Number)
      },
      properties: {
        lugar: req.body.lugar,
        municipalidad: req.body.municipalidad,
        ciudad: req.body.ciudad,
        confirmados: req.body.confirmados,
        fallecidos: req.body.fallecidos,
        recuperados: req.body.recuperados
      }
    },);

    console.log(mapa)
    await mapa.save(() => {
      res.status(201).json({ mensaje: "Nuevo marker agregado al mapa con éxito!" });
      log.info("Nuevo marker agregado al mapa con éxito!");
    });
  } catch (err) {
    log.error('Ups hubo un error!! ' + err);
  }
}

module.exports = {
  getMapa,
  postCaso
};