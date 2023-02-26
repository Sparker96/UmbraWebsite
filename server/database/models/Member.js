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
  },
  classColor: {
    type: Sequelize.STRING,
  },
  spec: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  isRaider: {
    type: Sequelize.BOOLEAN,
  },
  guildRankId: {
    type: Sequelize.INTEGER,
  },
  guildRank: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.INTEGER,
  },
  itemLevel: {
    type: Sequelize.INTEGER,
  },
  itemLevelColor: {
    type: Sequelize.STRING,
  },
  mythicPlusScore: {
    type: Sequelize.FLOAT,
  },
  mythicPlusColor: {
    type: Sequelize.STRING,
  },
  avatarMedia: {
    type: Sequelize.STRING,
  },
  insetMedia: {
    type: Sequelize.STRING,
  },
  mainMedia: {
    type: Sequelize.STRING,
  },
  mainRawMedia: {
    type: Sequelize.STRING,
  },
});

module.exports = Member;
