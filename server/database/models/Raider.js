const Sequelize = require("sequelize");
const db = require("../db");

const Raider = db.define("raider", {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT,
  imageUrl: Sequelize.STRING,
});

module.exports = Raider;
