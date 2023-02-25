const { Member } = require("../database/models/index");

// apiRoutes/members.js
const router = require("express").Router();

// matches GET requests to /api/members/
router.get("/", async function (req, res, next) {
  const data = await Member.findAll();
  res.send(data);
});

// matches GET requests to /api/members/:name
router.get("/:name", async function (req, res, next) {
    const data = await Member.findOne({ where: { name: req.params.name } });
    res.send(data);
  });




// matches POST requests to /api/members/
router.post("/", function (req, res, next) {
  /* etc */
});

// matches PUT requests to /api/members/:memberId
router.put("/:Id", function (req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/members/:memberId
router.delete("/:Id", function (req, res, next) {
  /* etc */
});

module.exports = router;
