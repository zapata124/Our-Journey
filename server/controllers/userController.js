const user = require('../model/userModel');

const SALT_FACTOR = 10;
const bcrypt = require('bcrypt');

const userController = {

  verify(req, res, next) {
    console.log(req.body)

    user.findOne({ username: req.body.username }, (err, result) => {
      if (err)
        return next({
          log: `Error  in userController.verify, error message ${err}`,
          message: `Error in the userController.verify, check logs`
        })


      if (result) {
        const compared = bcrypt.compareSync(result.password, req.locals.password);
      }

      res.locals.user = result;
      return next()
    })
  },

  async createUser(req, res, next) {

    user.findOne({ username: req.body.username })
      .then(result => {
        if (result) {
          res.json({
            success: false,
            message: 'This email already in use',
          }).send();
          throw new Error('email already exists')
        }

      })
      .then(() => bcrypt.hash(req.body.password, SALT_FACTOR))
      .then(hashed => {
        user.create({
          username: req.body.username,
          password: hashed,
        }, (err, result) => {
          if (err)
            return next({
              log: `Error  in userController.createUser, error message ${err}`,
              message: `Error in the userController.createUser, check logs`
            })
          res.locals.user = result;
          return next();
        })
      })
      .catch(error => console.log(error))
  }
}

module.exports = userController;