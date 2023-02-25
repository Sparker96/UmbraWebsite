const Sequelize = require("sequelize");
const db = require("../db");

const Updated = db.define(
  "updated",
  {
    timeStamp: {
      type: Sequelize.DATE,
    },
    count: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Updated;
