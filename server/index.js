const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const axios = require("axios");


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
      return data.access_token;
    } catch (err) {
      console.log(err);
    }
  };



//Logging Middleware
app.use(morgan("dev"));

//Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static File Middleware
app.use(express.static(path.join(__dirname, "../public")));

//Routing
app.use("/api", require("./apiRoutes"));

//SPA HomePage
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//500 Error Handling
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = { app, fetchToken};