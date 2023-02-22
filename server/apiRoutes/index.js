const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

router.use("/applicants", require("./applicants")); // matches all requests to /api/applicants/
router.use("/guild", require("./guild")); // matches all requests to  /api/guild/
router.use("/members", require("./members")); // matches all requests to /api/members/
router.use("/raiders", require("./raiders")); // matches all requests to /api/raiders/
router.use("/subs", require("./subs")); // matches all requests to /api/subs/


//Getting Oauth token from blizzard
const fetchToken = async () => {
  try {
    const { data } = await axios.post(
      "https://oauth.battle.net/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        auth: {
          username: `${process.env.BNET_OAUTH_CLIENT_ID}`,
          password: `${process.env.BNET_OAUTH_CLIENT_SECRET}`,
        },
      }
    );
    console.log(data.access_token);
    return data.access_token;
  } catch (err) {
    console.log(err);
  }
};


//404 Error Handling
router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
