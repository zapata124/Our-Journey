const express = require('express')

const mapController = require('../controllers/dataBase');

const router = express.Router();

router.get('/', mapController.getLocation,
  (req, res) => {
    console.log(res.locals.Locations)
    return res.status(200).json(res.locals.Locations);
  })

router.post('/', mapController.addTrip,
  (req, res) => {
    return res.status(200).json(res.locals.newReview);
  })

router.get('/:id', mapController.getReview,
  (req, res) => {
    return res.status(200).json(res.locals.Review)
  })

router.delete('/:id', mapController.deleteReview,
  (res, req) => {
    return res.status(200).json(res.locals.Review)
  })

module.exports = router;

