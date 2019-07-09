const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name: { type: String },
    stars: { type: Number },
    image: { type: String },
    price: { type: Number},
    amenities: { type: Array },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

const RoomsSchema = new Schema({
    name: { type: String },
    price: { type: Number }
});

const Room = mongoose.model('Room', RoomsSchema);
const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = {
    Hotel,
    Room
};