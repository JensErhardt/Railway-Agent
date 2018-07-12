var express = require('express');
const Rentalstation = require('../models/rentalstations');

var router = express.Router();

// Route to get all rentalstations
router.get('/', (req, res, next) => {
  console.log("rentalstations findAll")
  Rentalstation.find()
    .then(rentalstations => {
      res.json(rentalstations)
    })
    .catch(err => next(err))
})
// Route to get one rentalstation
router.get('/:id', (req, res, next) => {
  console.log("rentalstation findOne");
  Rentalstation.findById(req.params.id)
    .then(rentalstationDetail => {
      res.json(rentalstationDetail);
    })
    .catch(err => next(err))
});

module.exports = router;