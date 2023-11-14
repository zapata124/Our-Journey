
const Trip = require('../model/reviewModel');

const reviewController = {


    addTrip(req, res, next) {
        console.log(next);
        console.log(req.body)
        console.log('username: ', res.locals.username)


        const obj = {
            locationName: req.body.locationName,
            reviewer: res.locals.username.username,
            rating: req.body.rating,
            review: req.body.review,
            tripDate: req.body.tripDate,
            dailyBudget: req.body.dailyBudget,
            location: {
                type: 'Point',
                coordinates: req.body.coordinates
            }
        }

        Trip.create(obj)
            .then((data) => {
                res.locals.newReview = data;
                return next();
            }).catch((err) => {
                return next({
                    log: `Error in AddTrip middleware: ${err}`,
                    message: { err: 'An error occurred' },
                })
            })
    },


    getLocation(req, res, next) {
        Trip.find({ reviewer: res.locals.username.username }).then((data) => {
            console.log('saved data', data)
            res.locals.Locations = data;
            return next();
        }).catch((err) => {
            return next({
                log: `Error in getLocation middleware: ${err}`,
                message: { err: 'An error occured' },
            })
        })
    },


    getReview(req, res, next) {
        // console.log('r')
        Trip.findOne({ _id: req.params.id }).then((data) => {
            // console.log(data);
            res.locals.Review = data;
            return next();
        }).catch((err) => {
            return next({
                log: `Error in getReview middleware: ${err}`,
                message: { err: 'An error occured' },
            })
        })
    },


    deleteReview(req, res, next) {
        console.log(req.params.id)
        Trip.deleteOne({ _id: req.params.id }).then((data) => {
            res.locals.Review = data.location;
            return next();
        }).catch((err) => {
            return next({
                log: `Error in deleteReview middleware: ${err}`,
                message: { err: 'An error occured' },
            })
        })
    },





};


module.exports = reviewController;
