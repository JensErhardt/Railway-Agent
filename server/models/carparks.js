const mongoose = require('mongoose');
const { Schema } = mongoose;

const carparkSchema = new Schema({
  name: { type: String },
  carparkId: { type: Number },
  station: {
    id: { type: Number },
    name: { type: String },
  },
  address: {
    cityName: { type: String },
    postalCode: { type: Number },
    street: { type: String },
  },
  geoLocation: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  spaceType: { type: String },
  numberParkingPlaces: { type: Number },
  numberHandicapedPlaces: { type: Number },
  allocation: {
    validData: { type: Boolean, default: false },
    timestamp: { type: String, default: "" },
    timeSegment: { type: String, default: "" },
    capacity: { type: Number, default: 0 },
    category: { type: Number, default: 0 },
    text: { type: String, default: "no data availble" },
  },
  occupation: { type: Number },
  carparkUrl: { type: String }
});

module.exports = mongoose.model('Carpark', carparkSchema);