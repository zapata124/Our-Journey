const mongoose = require('mongoose');
const { ModuleFilenameHelpers } = require('webpack');

const Schema = mongoose.Schema;

const ourJourneySchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        rating: {
            type : Number,
            required: true
        },
        review : {
            type: String,
            required: false
        },
        locationName: {
            type: String,
            required: true
        },
        location: {
            longitude: Number,
            latitude: Number,
            required: true
        },
        reviewDate: {
            date: new Date().toDateString(),
            required: true
        },
        tripDate: {
            day: String,
            month: String, 
            date: Number,
            year: Number,
            required: true
        }
}
);

module.exports = mongoose.model('trip', ourJourneySchema);