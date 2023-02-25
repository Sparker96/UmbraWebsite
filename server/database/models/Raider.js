const Sequelize = require("sequelize");
const db = require("../db");

const Raider = db.define("raider", {
  name: Sequelize.STRING,
});

module.exports = Raider;
