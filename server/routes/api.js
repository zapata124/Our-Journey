const express = require('express')

const reviewController = require('../controllers/reviewController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/', 
  sessionController.isLoggedIn,
  reviewController.getLocation,
  (req, res) => {
    console.log(res.locals.Locations)
    return res.status(200).json(res.locals.Locations);
  })

router.post('/', 
  sessionController.isLoggedIn,
  reviewController.addTrip,
  (req, res) => {
    return res.status(200).json(res.locals.newReview);
  })

router.get('/:id', reviewController.getReview,
  (req, res) => {
    return res.status(200).json(res.locals.Review)
  })

router.delete('/:id', reviewController.deleteReview,
  (res, req) => {
    return res.status(200).json(res.locals.Review)
  })

module.exports = router;

