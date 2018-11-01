const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name: { type: String },
    stars: { type: Array },
    image: { type: String },
    price: { type: Number},
    amenities: { type: Array }
});

const Hotel = mongoose.model('hotels', HotelSchema);

module.exports = Hotel;