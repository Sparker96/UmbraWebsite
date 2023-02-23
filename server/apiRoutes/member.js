const { Token } = require("../database/models/index");
const axios = require("axios");
require("dotenv").config();

const BEGIN_URL_CHARACTER =
  "https://us.api.blizzard.com/profile/wow/character/illidan/";
const CONFIG_URL = "?namespace=profile-us&locale=en_US";
const GET_TOKEN = async () => {
  const { dataValues } = await Token.findByPk(1);
  return `&access_token=${dataValues.access_token}`;
};

// apiRoutes/member.js
const router = require("express").Router();


// matches GET requests to /api/member/:name
router.get("/:name", async function (req, res, next) {
    let name = req.params.name.toLowerCase();
    console.log(name)
   const { data } = await axios.get(
     `${BEGIN_URL_CHARACTER}${name}${CONFIG_URL}${await GET_TOKEN()}`
   );
  res.send(data);
});


// matches GET requests to /api/member/:name/media
router.get("/:name/media", async function (req, res, next) {
  let name = req.params.name.toLowerCase();
  console.log(name)
 const { data } = await axios.get(
   `${BEGIN_URL_CHARACTER}${name}/character-media${CONFIG_URL}${await GET_TOKEN()}`
 );
res.send(data);
});

// matches POST requests to /api/member/
router.post("/", function (req, res, next) {
  /* etc */
});

// matches PUT requests to /api/member/:memberId
router.put("/:Id", function (req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/member/:memberId
router.delete("/:Id", function (req, res, next) {
  /* etc */
});

module.exports = router;
