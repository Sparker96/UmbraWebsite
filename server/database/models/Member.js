const Sequelize = require("sequelize");
const db = require("../db");

const Member = db.define("member", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  class: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  spec: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  guildRankId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  guildRank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  itemLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  avatarMedia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  insetMedia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mainMedia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mainRawMedia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Member;
