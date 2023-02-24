const { Token } = require("../database/models/index");
const axios = require("axios");
require("dotenv").config();

const BEGIN_URL_CLASS =
  "https://us.api.blizzard.com/data/wow/playable-class/";
const CONFIG_URL = "?namespace=profile-us&locale=en_US";
const GET_TOKEN = async () => {
  const { dataValues } = await Token.findByPk(1);
  return `&access_token=${dataValues.access_token}`;
};

// apiRoutes/class.js
const router = require("express").Router();


// matches GET requests to /api/class
router.get("/", async function (req, res, next) {
    console.log("hit api")
   const { data } = await axios.get(
     `${BEGIN_URL_CHARACTER}/index${CONFIG_URL}${await GET_TOKEN()}`
   );
  res.send(data);
});


// matches GET requests to /api/class/:id
router.get("/:id", async function (req, res, next) {
  let id = req.params.name;
  console.log(id)
 const { data } = await axios.get(
   `${BEGIN_URL_CHARACTER}${id}${CONFIG_URL}${await GET_TOKEN()}`
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