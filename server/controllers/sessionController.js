const Session = require('../model/sessionModel');
const sessionController = {

  sessionStart(req, res, next) {
    console.log('start session here')
    console.log(res.locals.user.id)
    console.log(res.locals.user.username)
    Session.create({ cookieId: res.locals.user.id, username: res.locals.user.username }, (err, result) => {
      if (err) {
        console.log('sessionController.startSession Error: ', err);
        return next(err);
      }
      return next();
    })
  },

  isLoggedIn(req, res, next) {

    Session.findOne({ cookieId: req.cookies.ssid }, (err, result) => {
      if (err) {
        console.log('sessionController.isLoggedIn Error: ', err)
        return next(err);
      }
      res.locals.username = result;
      return next()
    })
  }

}

module.exports = sessionController;