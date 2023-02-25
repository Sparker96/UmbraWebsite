const db = require("../db");
const seedMembers = require("./seedMembers");
const seedGuild = require("./seedGuild");
const { Token, Updated } = require("../models/index");
const { fetchToken } = require("../../index");

async function seed() {
  try {
    //let {dataValues} = await Updated.findByPk(1)
    //if((Date.now()-dataValues.timeStamp)>60000){
    await db.sync({ force: true });
    await Updated.create({timeStamp: Date.now()})
    await Updated.create({count: 0})
    await Token.create({ access_token: await fetchToken() });
    seedMembers();
    seedGuild();
   // }
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

module.exports = seed;
