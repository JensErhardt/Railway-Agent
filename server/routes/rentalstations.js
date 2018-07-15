var express = require('express');
const axios = require('axios');
// const Rentalstation = require('../models/rentalstations');
const Railwaystation = require('../models/railwaystations');
var router = express.Router();


let railwaystationId = "5b48ad60e0527c6f6e99db27";

// Route to get information about rental objects in a certain area
// Radius 500m
// Limit 100 items
router.get('/call', (req, res, next) => {
  let longitude = "";
  let latitude = "";
  Railwaystation.findById(railwaystationId)
  .then(railwaystationDetail => {
     latitude = railwaystationDetail.geographicCoordinates[0];
     longitude = railwaystationDetail.geographicCoordinates[1];
    console.log("Longitude", longitude);
    console.log("Latitude", latitude);
    axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
    axios.get(`https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=100&providernetwork=1&begin=2018-07-13T20%3A07%3A00%2B02%3A00&end=2018-07-13T23%3A10%3A00%2B02%3A00`)
      .then(carSharingData => {
        console.log("CARS", carSharingData.data.items.length)
        let carsAvailable = carSharingData.data.items.length;
      })
      .catch(err => next(err))
    axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
    axios.get(`https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=100&providernetwork=2&begin=2018-07-13T20%3A07%3A00%2B02%3A00&end=2018-07-13T23%3A10%3A00%2B02%3A00`)
      .then(bikeSharingData => {
        console.log("BIKES", bikeSharingData.data.items.length);
        let bikesAvailable = bikeSharingData.data.items.length;
      })
      .catch(err => next(err))      
  })
  console.log("rentalstations findAll")
});

module.exports = router;