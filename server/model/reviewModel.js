const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  locationName: {
    type: String,
    required: [true, 'Please add a location name'],
  },
  reviewer: {
    type: String,
    required: [true, 'Please provide a the reviewer name']
  },
  rating: { type: Number, min: 0, max: 5, default: 3 },
  review: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  tripDate: Date,
  dailyBudget: Number,
  image: { data: Buffer, contentType: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

});

module.exports = mongoose.model('review', reviewSchema);