const Sequelize = require("sequelize");
const db = require("../db");

const Guild = db.define(
  "guild",
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    sever: {
        type: Sequelize.STRING,
      },
    memberCount: {
      type: Sequelize.INTEGER,
    },
    faction: {
      type: Sequelize.STRING,
    },
    progression: {
      type: Sequelize.STRING,
    },
    voiMythicWorldRank: {
      type: Sequelize.INTEGER,
    },
    voiMythicRegionRank: {
      type: Sequelize.INTEGER,
    },
    voiMythicRealmRank: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Guild;
