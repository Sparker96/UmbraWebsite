// apiRoutes/applicants.js
const router = require('express').Router();

// matches GET requests to /api/applicants/
router.get('/', function (req, res, next) { /* etc */});

// matches POST requests to /api/applicants/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/applicants/:applicantId
router.put('/:Id', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/applicants/:applicantId
router.delete('/:Id', function (req, res, next) { /* etc */});

module.exports = router;