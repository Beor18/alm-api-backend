const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const Schema = mongoose.Schema;

mongoose.plugin(toJson);
const CoronavirusSchema = new Schema({
    titulo: { type: String }
});

const Coronavirus = mongoose.model('Coronavirus', CoronavirusSchema);

module.exports = {
    Coronavirus
};