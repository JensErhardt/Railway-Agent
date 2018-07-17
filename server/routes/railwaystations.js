var express = require('express');
const Railwaystation = require('../models/railwaystations');
const Carpark = require('../models/carparks');
const axios = require('axios');

var router = express.Router();


// Route to get all Railwaystations
router.get('/', (req, res, next) => {
  console.log("railwaystation findAll")
  Railwaystation.find({ acceptedToken: false })
    .then(railways => {
      res.json(railways)
    })
    .catch(err => next(err))
})

// Route to call the API and fetch all railwaystations in the databank
router.get('/call', (req, res, next) => {
  let counter = 0
  console.log("station api call")
  axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';

  Railwaystation.deleteMany()
    .then(() => axios.get('http://api.deutschebahn.com/stada/v2/stations'))
    .then(railwaystationData => {
      for (let i = 0; i < railwaystationData.data.result.length; i++) {
        if (railwaystationData.data.result[i].evaNumbers[0] === undefined) { continue; }
        let stationId = railwaystationData.data.result[i].number;

        // console.log(stationId);
        Carpark.findOne({ "station.id": stationId })
          .then(carparkData => {
            console.log("DEBUG carparkData", i, carparkData);
            if (carparkData) {
              console.log("counter", ++counter);
              Railwaystation.create({
                number: railwaystationData.data.result[i].number,
                category: railwaystationData.data.result[i].category,
                name: railwaystationData.data.result[i].name,
                address: railwaystationData.data.result[i].mailingAddress,
                geographicCoordinates: railwaystationData.data.result[i].evaNumbers[0].geographicCoordinates.coordinates
              })
            }
          })
          .catch(err => next(err))
      }
      console.log("station call successful")
    })
    .then()
    .catch(err => next(err))
})

// Route to get all railwaystations
router.get('/all', (req, res, net) => {
  console.log("DEBUG railwaystationsALL");

  Railwaystation.find()
    .then(railwaystationData => {
      res.json(railwaystationData);
    })
    .catch(err => next(err))
})

// Route to get one Railwaystation
router.get('/:id', (req, res, next) => {

  let railwaystationId = req.params.id;
  Railwaystation.findById(railwaystationId)
    .then(railwaystationDetail => {
      carparkStationNumber = railwaystationDetail.number;
      Carpark.findOne({ "station.id": carparkStationNumber })
        .then(carparkDetail => {
          let stationDetail = {
            railwaystationDetail: railwaystationDetail,
            carparkDetail: carparkDetail
          }
          res.json(stationDetail);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});



module.exports = router;
