const Session = require('../model/sessionModel');
const sessionController = {

  sessionStart(req, res, next) {
    console.log('start session here')
    Session.create({ cookieId: res.locals.user.id, username: res.locals.user.username }, (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }
    })
  },

  isLoggedIn(req, res, next) {

    Session.findOne({ cookieId: req.cookies.ssid }, (err, result) => {
      if (err) {
        console.log(err)
        return next(err);
      }
      res.locals.username = result;
      return next()
    })
  }

}

module.exports = sessionController;