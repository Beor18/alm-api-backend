const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const Schema = mongoose.Schema;

mongoose.plugin(toJson);
const TablaSchema = new Schema({
    provincia: { type: String, required: true },
    municipalidad: { type: String, required: true },
    ciudad: { type: String, required: true },
    confirmados: { type: Number, require: true },
    fallecidos: { type: Number, require: true },
    recuperados: { type: Number, require: true },
});

TablaSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj._id;
    delete obj.__v
    return obj;
}

const Tabla = mongoose.model('Tabla', TablaSchema);

module.exports = {
    Tabla
};