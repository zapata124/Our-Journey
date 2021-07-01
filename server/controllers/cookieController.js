
const cookieController = {

  setSSIDCookie(req, res, next) {
    res.cookie('ssid', res.locals.user.id, {httpOnly: true});
    return next()
  }
}

module.exports = cookieController;