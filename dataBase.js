const { ModuleFilenameHelpers } = require('webpack');
const { db } = require('./schema');
const Trip = require('./schema');

const TripController = {


    addTrip(req, res, next) {
        Trip.create(
            {
                name: req.body.name,
                rating: req.body.rating,
                review: req.body.review,
                locattionName: req.body.locattionName,
                location: req.body.location,
                reviewDate: req.body.reviewDate,
                tripDate: req.body.tripDate,

            }
            ).then( (data) => {
                res.locals.newReview = data;
                return next();
            }).catch( (err) => {
                return next({
                    log: `Error in AddTrip middleware: ${err}`,
                    message: { err: 'An error occurred'},
                })
            })
        },


    getLocation(req, res, next) {
        Trip.find( {}, {location: 1}).then( (data) => {
            res.locals.Locations = data;
        }).catch( (err) => {
            return next({
                log: `Error in getLocation middleware: ${err}`,
                message: { err: 'An error occured'},
            })
        })
    },


    getReview(req, res, next) {
        Trip.find({_id: res.params.id}).then( (data) => {
            res.locals.Review = data;
        }).catch( (err) => {
            return next( {
                log: `Error in getReview middleware: ${err}`,
                message: { err: 'An error occured'},
            })
        })
    },


    deleteReview(req, res, next) {
        Trip.deleteOne({_id: res.params.id}).then( (data) => {
            res.locals.Review = data.location;
        }).catch( (err) => {
            return next( {
                log: `Error in deleteReview middleware: ${err}`,
                message: { err: 'An error occured'},
            })
        })
    },




    
};


module.exports = TripController;
