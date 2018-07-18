var express = require('express');
const Carpark = require('../models/carparks');
const axios = require('axios');
const Railwaystation = require('../models/railwaystations');
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
  let nbOfCarparkSaved = 0
  axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
  axios.get('http://api.deutschebahn.com/bahnpark/v1/spaces?limit=300')
    .then(carparkData => {
      for (let i = 0; i < carparkData.data.items.length; i++) {
        if (carparkData.data.items[i].facilityType === "Schrankenanlage") {
          let newCarpark = new Carpark({
            name: carparkData.data.items[i].title,
            carparkId: carparkData.data.items[i].id,
            station: carparkData.data.items[i].station,
            address: carparkData.data.items[i].address,
            geoLocation: carparkData.data.items[i].geoLocation,
            spaceType: carparkData.data.items[i].spaceType,
            numberParkingPlaces: carparkData.data.items[i].numberParkingPlaces,
            numberHandicapedPlaces: carparkData.data.items[i].numberHandicapedPlaces,
            carparkUrl: carparkData.data.items[i].url  
          });
          newCarpark.save((err) => {
            if (err) {
              console.log(err);
            }
            else {
              nbOfCarparkSaved++
            }
          })
        }
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
  // Dirty code to send a json
  setTimeout(() => {
    res.json({success: "maybe", nbOfCarparkSaved})
  }, 10000)
})

router.get('/prognoses/:id', (req, res, next) => {
  let stationId = req.params.id;

  //Query to find out car park id
  Railwaystation.findById(stationId)
    .then(stationData => {
      stationId = stationData.number;
      Carpark.find({ "station.id": stationId })
        .then(carparkData => {
          let carparkId = carparkData[0].carparkId;
          console.log("DEBUG carparkId", carparkData[0].carparkId);

          axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
          axios.get(`http://api.deutschebahn.com/bahnpark/v1/spaces/${carparkId}/prognoses`)
            .then(prognosesData => {

              let prognosesDataExport = {
                carparkId: prognosesData.data.space.id,
                stationId: prognosesData.data.space.station.id,
                name: prognosesData.data.space.nameDisplay,
                prognosesText: prognosesData.data.prognoses[0].prognosedAllocation.text,
                timestamp: new Date() + 2
              };
              res.json(prognosesDataExport)
            })
            .catch(err => next(err))
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router;