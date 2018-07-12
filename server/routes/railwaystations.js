var express = require('express');
const Railwaystation = require('../models/railwaystations');

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
