const { Guild } = require("../database/models/index");
const axios = require("axios");
require("dotenv").config();


// apiRoutes/guild.js
const router = require("express").Router();

// matches GET requests to /api/guild/
router.get("/", async function (req, res, next) {
  const data = await Guild.findByPk(1);
  res.send(data);
});

// matches POST requests to /api/guild/
router.post("/", function (req, res, next) {
  /* etc */
});

// matches PUT requests to /api/guild/:guildId
router.put("/:Id", function (req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/guild/:guildId
router.delete("/:Id", function (req, res, next) {
  /* etc */
});

module.exports = router;
