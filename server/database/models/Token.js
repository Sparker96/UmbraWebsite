const Sequelize = require("sequelize");
const db = require("../db");

const Token = db.define("token", {
  access_token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Token;
