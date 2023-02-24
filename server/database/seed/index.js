const db = require("../db");
const seedMembers = require("./seedMembers");
const seedGuild = require("./seedGuild");
const { Token } = require("../models/index");
const { fetchToken } = require("../../index");

async function seed() {
  try {
    await db.sync({ force: true });
    await Token.create({ access_token: await fetchToken() });
    //seedMembers();
    seedGuild();
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

module.exports = seed;
