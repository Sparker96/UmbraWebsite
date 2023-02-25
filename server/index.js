const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const axios = require("axios");
require("dotenv").config();

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

module.exports = { app };