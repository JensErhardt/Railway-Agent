const mongoose = require('mongoose');
const { Schema } = mongoose;

const rentallocationSchema = new Schema({
  name: {type:String, required:true},
  address: {type:String},
  longitude: {type:Number},
  latitude: {type:Number},
  bikesavailable: {type:number, default: 0},
  carsavailable: {type:number, default: 0},
  railwaystation: [
    {
      railwaystation: {
        type: Schema.Types.ObjectId,
        ref: 'railwaystation'
      },
    }
  ]
});

module.exports = mongoose.model('rentallocationSchema');