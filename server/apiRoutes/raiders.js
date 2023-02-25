const { Member } = require("../database/models/index");

// apiRoutes/raiders.js
const router = require('express').Router();

// matches GET requests to /api/raiders/
router.get("/", async function (req, res, next) {
    const data = await Member.findAll({where:{isRaider: true}});
    res.send(data);
  });
  

  

// matches POST requests to /api/raiders/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/raiders/:raiderId
router.put('/:Id', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/raiders/:raiderId
router.delete('/:Id', function (req, res, next) { /* etc */});

module.exports = router;