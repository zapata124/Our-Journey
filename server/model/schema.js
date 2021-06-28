const mongoose = require('mongoose');
const { ModuleFilenameHelpers } = require('webpack');

const MONGO_URL = "mongodb+srv://armadillos:armadillos@cluster0.da8dl.mongodb.net/armadillos?retryWrites=true&w=majority" //--username armadillos

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'armadillos'
})

const Schema = mongoose.Schema;

const ourJourneySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
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
        },
        reviewDate: {
            date: Date,
        },
        tripDate: {
            day: String,
            month: String,
            date: Number,
            year: Number,
        }
    }
);

module.exports = mongoose.model('trip', ourJourneySchema);