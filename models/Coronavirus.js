const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const moment = require('moment-timezone');
require('mongodb-moment')(moment);
const Schema = mongoose.Schema;

mongoose.plugin(toJson);
const CoronavirusSchema = new Schema({
    titulo: { type: String },
    confirmados: { type: String },
    fallecidos: { type: String },
    recuperados: { type: String },
    activos: { type: String },
    total_mundo: { type: String },
    date: {
        type: String,
        default: moment(new Date()).tz('America/Argentina/Buenos_Aires').format('HH:mm')
    }
});

CoronavirusSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj._id;
    delete obj.__v
    return obj;
}

const Coronavirus = mongoose.model('Coronavirus', CoronavirusSchema);

module.exports = {
    Coronavirus
};