const router = require('express').Router();

//router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/testRoute', require('./testRoute')); // matches all requests to  /api/testRoute/
//router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

//404 Error Handling
router.use(function (req, res, next) {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
  });

module.exports = router;