// apiRoutes/subs.js
const router = require('express').Router();

// matches GET requests to /api/subs/
router.get('/', function (req, res, next) { /* etc */});

// matches POST requests to /api/subs/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/subs/:subId
router.put('/:Id', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/subs/:subId
router.delete('/:Id', function (req, res, next) { /* etc */});

module.exports = router;