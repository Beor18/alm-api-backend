const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const moment = require('moment-timezone');
require('mongodb-moment')(moment);
const Schema = mongoose.Schema;

mongoose.plugin(toJson);
const CoronavirusSchema = new Schema({
    titulo: { type: String },
    confirmados: { type: Number },
    fallecidos: { type: Number },
    recuperados: { type: Number },
    total_mundo: { type: Number },
    date: {
        type: String,
        default: moment(new Date()).tz('America/Argentina/Buenos_Aires').format('LT')
    }
});

const Coronavirus = mongoose.model('Coronavirus', CoronavirusSchema);

module.exports = {
    Coronavirus
};