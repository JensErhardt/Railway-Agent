const mongoose = require('mongoose');
const { Schema } = mongoose;

const carparkSchema = new Schema({
  name: {type:String, required:true},
  address: {type:String},
  longitude: {type:Number},
  latitude: {type:Number},
  maxcapacity: {type:number},
  freespaces: {type:number},
  occupation: {type:number},
  trainstation: [
    {
      trainstation: {
        type: Schema.Types.ObjectId,
        ref: 'trainstation'
      }
    }
  ]
});

module.exports = mongoose.model('Carpark', carparkSchema);