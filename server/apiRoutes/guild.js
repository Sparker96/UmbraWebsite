const { Token } = require("../database/models/index");
const axios = require("axios");
require("dotenv").config();

const BEGIN_URL_GUILD =
  "https://us.api.blizzard.com/data/wow/guild/illidan/umbra";
const CONFIG_URL = "?namespace=profile-us&locale=en_US";
const GET_TOKEN = async () => {
  const { dataValues } = await Token.findByPk(1);
  return `&access_token=${dataValues.access_token}`;
};

// apiRoutes/guild.js
const router = require("express").Router();

// matches GET requests to /api/guild/
router.get("/", async function (req, res, next) {
  const { data } = await axios.get(
    `${BEGIN_URL_GUILD}${CONFIG_URL}${await GET_TOKEN()}`
  );
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
