const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const moment = require('moment-timezone');
require('mongodb-moment')(moment);
const Schema = mongoose.Schema;

mongoose.plugin(toJson);
const MapaSchema = new Schema({
    type: { type: String },
    properties: {
      lugar: { type: String, required: true },
      municipalidad: { type: String, required: true },
      ciudad: { type: String, required: true },
      confirmados: { type: Number, require: true },
      fallecidos: { type: Number, require: true },
      recuperados: { type: Number, require: true },
    },
    geometry: {
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number]}
    }
  });

MapaSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj._id;
    delete obj.__v
    return obj;
}

const Mapa = mongoose.model('Mapa', MapaSchema);

module.exports = {
    Mapa
};