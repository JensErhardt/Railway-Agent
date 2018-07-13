var express = require('express');
const Carpark = require('../models/carparks');

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

// Route to call the API and fetch all railwaystations in the databank
router.get('/carparks', (req, res, next) => {
  console.log("carparks api call")
  axios.defaults.headers.common['Authorization'] = 'Bearer bf8e861cad4565da30955ff66c53f8c1';
  axios.get('http://api.deutschebahn.com/stada/v2/stations')
    .then(railwaystationData => {

      let item = {
        number : railwaystationData.data.number
      }
      console.log("DEBUG number", item)

      console.log("station call successful")
      
      // Railwaystation.insertMany(railwaystationData);
      
      // console.log("station insertMany successful");
      
    })  
    .catch(err => next(err))
})

// Route to get one capark
router.get('/:id', (req, res, next) => {
  console.log("carpark findOne");
  Carpark.findById(req.params.id)
    .then(carparkDetail => {
      res.json(carparkDetail);
    })
    .catch(err => next(err))
});

module.exports = router;