const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const amenitie = {
    values: [
    "nightclub",
    "business-center",
    "bathtub",
    "newspaper",
    "restaurant"
    ],
    message: '{VALUE} no es una amenitie valida'
};

const HotelSchema = new Schema({
    name: { type: String },
    stars: { type: Number },
    image: { type: String },
    price: { type: Number},
    amenities: { type: Array }
});

const Hotel = mongoose.model('hotels', HotelSchema);

module.exports = Hotel;