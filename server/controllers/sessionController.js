const Session = require('../model/sessionModel');
const sessionController = {

  sessionStart(req, res, next) {
    console.log('start session here')

    Session.create({ cookieId: res.locals.user.id }, (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return next();
    })
  },

  isLoggedIn(req, res, next) {

    Session.findOne({ cookieId: req.cookies.ssid }, (err, result) => {
      if (err) {
        console.log(err)
        return next(err);
      }
      return next()
    })
  }

}

module.exports = sessionController;