// apiRoutes/raiders.js
const router = require('express').Router();

// matches GET requests to /api/raiders/
router.get('/', function (req, res, next) { /* etc */});

// matches POST requests to /api/raiders/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/raiders/:raiderId
router.put('/:Id', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/raiders/:raiderId
router.delete('/:Id', function (req, res, next) { /* etc */});

module.exports = router;