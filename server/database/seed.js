const axios = require("axios");
const db = require("./db");
const { fetchToken } = require("../index");
const { Token, Member, Raider, Class } = require("./models/index");

const BEGIN_URL_CHARACTER =
  "https://us.api.blizzard.com/profile/wow/character/illidan/";
const BEGIN_URL_GUILD =
  "https://us.api.blizzard.com/data/wow/guild/illidan/umbra";
const CONFIG_URL_PLAYER = "?namespace=profile-us&locale=en_US";
const BEGIN_URL_CLASS = "https://us.api.blizzard.com/data/wow/playable-class/";
const CONFIG_URL_DATA = "?namespace=static-us&locale=en_US";
const GET_TOKEN = async () => {
  const { dataValues } = await Token.findByPk(1);
  return `&access_token=${dataValues.access_token}`;
};

function rankFinder(rankId) {
  switch (rankId) {
    case 0:
      return "Guild Master";
    case 1:
      return "CO-Guild Master";
    case 2:
      return "Officer";
    case 3:
      return "Officer Alt";
    case 4:
      return "Core Raider";
    case 5:
      return "Core Sub";
    case 6:
      return "Trial Raider";
    case 7:
      return "Member";
    default:
      return null;
  }
}

function roleFinder(spec) {
  switch (spec) {
    case "Protection" ||
      "Blood" ||
      "Vengeance" ||
      "Guardian" ||
      "Brewmaster" ||
      "Protection":
      return "Tank";
    case "Restoration" ||
      "Mistweaver" ||
      "Holy" ||
      "Discipline" ||
      "Restoration" ||
      "Preservation Evoker":
      return "Healer";
    default:
      return "Dps";
  }
}

function classColor(charClass) {
  switch (charClass) {
    case "Death Knight":
      return "#C41E3A";
    case "Demon Hunter":
      return "#A330C9";
    case "Druid":
      return "#FF7C0A";
    case "Evoker":
      return "#33937F";
    case "Hunter":
      return "#AAD372";
    case "Mage":
      return "#3FC7EB";
    case "Monk":
      return "#00FF98";
    case "Paladin":
      return "#F48CBA";
    case "Priest":
      return "#FFFFFF";
    case "Rogue":
      return "#FFF468";
    case "Shaman":
      return "#0070DD";
    case "Warlock":
      return "#8788EE";
    case "Warrior":
      return "#C69B6D";
    default:
      return null;
  }
}

async function seedClass() {
  try {
    let { data } = await axios.get(
      `${BEGIN_URL_CLASS}index${CONFIG_URL_DATA}${await GET_TOKEN()}`
    );
    const classes = await Class.bulkCreate(data.classes);
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

async function seedMembers() {
  try {
    let { data } = await axios.get(
      `${BEGIN_URL_GUILD}/roster${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
    );

    data.members.forEach(async (member, i) => {
      member.character.guildRankId = member.rank;
      member.character.guildRank = rankFinder(member.rank);
      let charClass = await Class.findByPk(member.character.playable_class.id);
      await setTimeout(async () => {
        if (member.character.level !== 1) {
          let { data } = await axios.get(
            `${BEGIN_URL_CHARACTER}${member.character.name.toLowerCase()}${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
          );
          member.character.spec = data.active_spec.name;
          member.character.role = roleFinder(data.active_spec.name);
          member.character.class = charClass.name;
          member.character.classColor = classColor(charClass.name);
          member.character.playable_class.name = charClass.name;
          member.character.itemLevel = data.average_item_level;
          try {
            let { data } = await axios.get(
              `${BEGIN_URL_CHARACTER}${member.character.name.toLowerCase()}/character-media${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
            );
            member.character.avatarMedia = data.assets[0].value;
            member.character.insetMedia = data.assets[1].value;
            member.character.mainMedia = data.assets[2].value;
            member.character.mainRawMedia = data.assets[3].value;
          } catch (err) {
            console.log("probz svensif");
            data =
              "https://www.citypng.com/public/uploads/preview/png-red-question-symbol-mark-icon-11664604913fofuexjtok.png";
            member.character.avatarMedia = data;
            member.character.insetMedia = data;
            member.character.mainMedia = data;
            member.character.mainRawMedia = data;
          }

          Member.create(member.character);
        }
      }, i * 40);
    });
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

async function seed() {
  try {
    await db.sync({ force: true });
    await Token.create({ access_token: await fetchToken() });
    seedClass();
    seedMembers();
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

module.exports = seed;
