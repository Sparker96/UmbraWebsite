const { Member } = require("../database/models/index");
const axios = require("axios");


// apiRoutes/members.js
const router = require('express').Router();

// matches GET requests to /api/members/
router.get('/', async function (req, res, next) {
    const data = await Member.findAll()
    console.log(data)
    res.send(data);});

// matches POST requests to /api/members/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/members/:memberId
router.put('/:Id', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/members/:memberId
router.delete('/:Id', function (req, res, next) { /* etc */});

module.exports = router;