const Sequelize = require("sequelize");
const db = require("../db");

const Token = db.define("token", {
  access_token_bnet: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Token;
