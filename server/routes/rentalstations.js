var express = require('express');
const axios = require('axios');
// const Rentalstation = require('../models/rentalstations');
const Railwaystation = require('../models/railwaystations');
var router = express.Router();


// Route to get information about rental objects in a certain area
// Radius 500m
// Limit 100 items
router.get('/:id', (req, res, next) => {

  let railwaystationId = req.params.id;
  // data for http request to flinskter
  let longitude = "";
  let latitude = "";
  let today = new Date();
  let dd = addZero(today.getDate());
  let mm = addZero(today.getMonth() + 1);
  let yyyy = today.getFullYear();
  let hhStart = Number(addZero(today.getHours() + (120 + today.getTimezoneOffset())/60 )) + 1;
  let hhEnd = addZero(hhStart + 2);
  // function to convert date/time in two digits
  function addZero(n) { return n < 10 ? '0' + n : '' + n; }
  console.log("DEBUG today", today.getTimezoneOffset());
  console.log("DEBUG today", (120 - today.getTimezoneOffset())/60);
  console.log("DEBUG hhStart", hhStart);
  console.log("DEBUG 1", `https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=50&providernetwork=1&begin=${yyyy}-${mm}-${dd}T${hhStart}%3A07%3A00%2B02%3A00&end=${yyyy}-${mm}-${dd}T${hhEnd}%3A10%3A00%2B02%3A00`);
  console.log("DEBUG 2", `https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=50&providernetwork=2&begin=${yyyy}-${mm}-${dd}T${hhStart}%3A07%3A00%2B02%3A00&end=${yyyy}-${mm}-${dd}T${hhEnd}%3A10%3A00%2B02%3A00`);


  Railwaystation.findById(railwaystationId)
    .then(railwaystationDetail => {
      latitude = railwaystationDetail.geographicCoordinates[0];
      longitude = railwaystationDetail.geographicCoordinates[1];

      axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
      // https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=100&providernetwork=1&begin=2018-07-13T20%3A07%3A00%2B02%3A00&end=2018-07-16T23%3A10%3A00%2B02%3A00


      
      axios.get(`https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=50&providernetwork=1&begin=${yyyy}-${mm}-${dd}T${hhStart}%3A07%3A00%2B02%3A00&end=${yyyy}-${mm}-${dd}T${hhEnd}%3A10%3A00%2B02%3A00`)
        .then(carSharingData => {
          console.log("CARS", carSharingData.data.items.length)
          let carsAvailable = carSharingData.data.items.length;
          // https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=100&providernetwork=2&begin=2018-07-13T20%3A07%3A00%2B02%3A00&end=2018-07-16T23%3A10%3A00%2B02%3A00
          axios.get(`https://api.deutschebahn.com/flinkster-api-ng/v1/bookingproposals?lat=${longitude}&lon=${latitude}&radius=500&offset=5&limit=50&providernetwork=2&begin=${yyyy}-${mm}-${dd}T${hhStart}%3A07%3A00%2B02%3A00&end=${yyyy}-${mm}-${dd}T${hhEnd}%3A10%3A00%2B02%3A00`)
            .then(bikeSharingData => {
              console.log("BIKES", bikeSharingData.data.items.length);
              let bikesAvailable = bikeSharingData.data.items.length;
              let rentalObjects = {
                carsAvailable,
                bikesAvailable
              }
              console.log("DEBUG rentalObects call", rentalObjects);

              res.json(rentalObjects)
            })
            .catch(err => next(err))
        })
        .catch(err => next(err))
    })
  console.log("rentalstations findAll")
});

module.exports = router;