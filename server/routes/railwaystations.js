var express = require('express');
const Railwaystation = require('../models/railwaystations');
const axios = require('axios');

var router = express.Router();


// Route to get all Railwaystations
router.get('/', (req, res, next) => {
  console.log("railwaystation findAll")
  Railwaystation.find()
    .then(railways => {
      res.json(railways)
    })
    .catch(err => next(err))
})

// Route to call the API and fetch all railwaystations in the databank
router.get('/call', (req, res, next) => {
  console.log("station api call")
  axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
  axios.get('http://api.deutschebahn.com/stada/v2/stations')
    .then(railwaystationData => {
      for (let i = 0; i < railwaystationData.data.result.length; i++) {
        if (railwaystationData.data.result[i].evaNumbers[0] === undefined) { continue; }
        let newRailwaystation = new Railwaystation({
          number: railwaystationData.data.result[i].number,
          name: railwaystationData.data.result[i].name,
          address: railwaystationData.data.result[i].mailingAddress,
          geographicCoordinates: railwaystationData.data.result[i].evaNumbers[0].geographicCoordinates.coordinates
        });
        newRailwaystation.save((err) => {
          if (err) {
            console.log(err);
          }
        })
      }
      console.log("station call successful")
    })
    .catch(err => next(err))
})

// Route to get one Railwaystation
router.get('/:id', (req, res, next) => {
  console.log("railwaystation findOne");
  Railwaystation.findById(req.params.id)
    .then(railwaystationDetail => {
      res.json(railwaystationDetail);
    })
    .catch(err => next(err))
});



module.exports = router;
