const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: [true, 'please create a username'], unique: [true, 'Sorry that username is already in use'] },
  password: { type: String, required: [true, 'Please create a password'] },
  date: { type: Date, default: Date.now }
})

userSchema.statics.usernameInUse = function (username) {
  console.log(username);
  this.findOne({ username }, (err, result) => {
    if (err) {
      console.log('error inside the usernameInUse method ', err.message)
      return false
    }
    console.log('result', result)
    if (result) return true;
    return false;
  })
}

module.exports = mongoose.model('User', userSchema)