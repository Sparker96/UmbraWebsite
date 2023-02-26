const Sequelize = require("sequelize");
const db = require("../db");

const MPlusColor = db.define("mPlusColor", {
  score: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  rgbHex: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = MPlusColor;
