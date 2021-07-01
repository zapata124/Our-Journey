const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  username: { type: String, require: true },
  cookieId: { type: String, require: true, unique: true },
  createdAt: { type: Date, expires: 3000, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
