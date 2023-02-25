const axios = require("axios");
const db = require("../db");
const { Token, Guild } = require("../models/index");

// const BEGIN_URL_CHARACTER =
//   "https://us.api.blizzard.com/profile/wow/character/illidan/";
// const BEGIN_URL_CLASS = "https://us.api.blizzard.com/data/wow/playable-class/";
// const CONFIG_URL_DATA = "?namespace=static-us&locale=en_US";

const BEGIN_URL_GUILD =
  "https://us.api.blizzard.com/data/wow/guild/illidan/umbra";
const CONFIG_URL_PLAYER = "?namespace=profile-us&locale=en_US";
const GET_TOKEN = async () => {
  const { dataValues } = await Token.findByPk(1);
  return `&access_token=${dataValues.access_token_bnet}`;
};

module.exports = async function seedGuild() {
  try {
    let { data } = await axios.get(
      `${BEGIN_URL_GUILD}${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
    );
    guild = {};
    guild.name = data.name;
    guild.server = data.realm.name;
    guild.faction = data.faction.name;
    guild.memberCount = data.member_count;
    try {
      let { data } = await axios.get(
        `https://raider.io/api/v1/guilds/profile?region=us&realm=illidan&name=umbra&fields=raid_progression`
      );
      guild.progression = Object.values(data.raid_progression)[0].summary;
    } catch (err) {}
    try {
      let { data } = await axios.get(
        `https://raider.io/api/v1/guilds/profile?region=us&realm=illidan&name=umbra&fields=raid_rankings`
      );
      guild.voiMythicWorldRank = Object.values(
        data.raid_rankings
      )[0].mythic.world;
      guild.voiMythicRegionRank = Object.values(
        data.raid_rankings
      )[0].mythic.region;
      guild.voiMythicRealmRank = Object.values(
        data.raid_rankings
      )[0].mythic.realm;
    } catch (err) {}
    guild.description = `We are a Top 100 raiding and Mythic+ guild that is CE (cutting edge) focused. Progression is currently ${guild.progression}ythic and 8/8 Heroic. We are Looking for RetPal/Hpriest/PresEvoker/Mage/Competitive DPS players

    Right now we are striving to be a top 100 2 day raiding guild and are working hard to achieve that end goal.
    
    If you are interested in joining us, please add Rageyy#1452 bnet / rageyy#4684 discord or apply to Umbra on Illidan through the guild app in-game. 
    
    Thank you and we look forward to hear from you!`;
    Guild.create(guild);
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
};
