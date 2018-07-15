var express = require('express');
const Carpark = require('../models/carparks');
const axios = require('axios');

var router = express.Router();

// Route to get all carparks
router.get('/', (req, res, next) => {
  console.log("carparks findAll")
  Carpark.find()
    .then(carparks => {
      res.json(carparks)
    })
    .catch(err => next(err))
})

// Route to call the API and fetch all carparks in the databank
router.get('/call', (req, res, next) => {
  console.log("carparks api call")
  axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
  axios.get('http://api.deutschebahn.com/bahnpark/v1/spaces?limit=300')
    .then(carparkData => {
      for (let i = 0; i < carparkData.data.items.length; i++) {
        let newCarpark = new Carpark({
          name: carparkData.data.items[i].title,
          carparkId: carparkData.data.items[i].id,
          station: carparkData.data.items[i].station,
          address: carparkData.data.items[i].address,
          geoLocation: carparkData.data.items[i].geoLocation,
          spaceType: carparkData.data.items[i].spaceType,
          numberParkingPlaces: carparkData.data.items[i].numberParkingPlaces,
          numberHandicapedPlaces: carparkData.data.items[i].numberHandicapedPlaces,
        });
        newCarpark.save((err) => {
          if (err) {
            console.log(err);
          }
        })
      }
      console.log("carpparks api call successful")
    })
  axios.get('http://api.deutschebahn.com/bahnpark/v1/spaces/occupancies?limit=300')
    .then(occupancieData => {
      console.log("allocations call")
      for (let i = 0; i < occupancieData.data.allocations.length; i++) {
        let carparkId = occupancieData.data.allocations[i].space.id;
        Carpark.findOneAndUpdate({ carparkId: carparkId },
          { $set: { allocation: occupancieData.data.allocations[i].allocation } },
        )
      }
      console.log("findOneAndUpdate finished");
    })
    .catch(err => next(err))
})

// Route to get one capark
// router.get('/:id', (req, res, next) => {
//   console.log("carpark findOne");
//   Carpark.findById(req.params.id)
//     .then(carparkDetail => {
//       res.json(carparkDetail);
//     })
//     .catch(err => next(err))
// });

module.exports = router;