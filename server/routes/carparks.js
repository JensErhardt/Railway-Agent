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