const mongoose = require('mongoose');
const { Schema } = mongoose;

const railwaystationSchema = new Schema({
  name: {type:String, required:[true]},
  address: {type:String},
  longitude: {type:Number},
  latitude: {type:Number},
  rentalstations: [
    {
      rentalstation: {
        type: Schema.Types.ObjectId,
        ref: 'rentalstation'
      },
    }
  ]
});

module.exports = mongoose.model('Railwaystation', railwaystationSchema);