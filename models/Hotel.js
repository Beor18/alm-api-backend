const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name: { type: String },
    description: { type: String },
    address: { type: String },
    neighborhood: { type: String },
    province: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    stars: { type: Number },
    image: { type: String },
    price: { type: Number},
    discount: { type: Number },
    phone: { type: String },
    amenities: { type: Array },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

const RoomsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    availability: { type: Number },
    amenities: { type: Array },
    image: { type: String },
    price: { type: Number }
});

const Room = mongoose.model('Room', RoomsSchema);
const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = {
    Hotel,
    Room
};