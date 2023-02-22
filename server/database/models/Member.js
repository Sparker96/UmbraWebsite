const Sequelize = require("sequelize");
const db = require("../db");

const Member = db.define("member", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Member;
