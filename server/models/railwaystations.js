const mongoose = require('mongoose');
const { Schema } = mongoose;

const railwaystationSchema = new Schema({
  number: { type: Number },
  name: { type: String, required: [true] },
  category: { type: Number },
  address: {
    city: { type: String },
    zipcode: { type: Number },
    street: { type: String },
  },
  geographicCoordinates: { type: [Number, Number] }
});

module.exports = mongoose.model('Railwaystation', railwaystationSchema);