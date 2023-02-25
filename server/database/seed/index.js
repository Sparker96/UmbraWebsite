const db = require("../db");
const seedMembers = require("./seedMembers");
const seedGuild = require("./seedGuild");
const { Token } = require("../models/index");
const axios = require("axios")

//Getting Oauth token from blizzard
const fetchToken = async () => {
  try {
    const { data } = await axios.post(
      "https://oauth.battle.net/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        auth: {
          username: `${process.env.BNET_OAUTH_CLIENT_ID}`,
          password: `${process.env.BNET_OAUTH_CLIENT_SECRET}`,
        },
      }
    );
    return data.access_token;
  } catch (err) {
    console.log(err);
  }
};

async function seed() {
  try {
    //let {dataValues} = await Updated.findByPk(1)
    //if((Date.now()-dataValues.timeStamp)>60000){
    //await db.sync({ force: true });
    //await Token.create({ access_token_bnet: await fetchToken() });
    //await seedMembers();
    //await seedGuild();
   // }
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

module.exports = seed;
