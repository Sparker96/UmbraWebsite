const axios = require("axios");
const db = require("../db");
const { Token, Member } = require("../models/index");

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

function classFinder(rankId) {
  switch (rankId) {
    case 1:
      return "Warrior";
    case 2:
      return "Paladin";
    case 3:
      return "Hunter";
    case 4:
      return "Rogue";
    case 5:
      return "Priest";
    case 6:
      return "Death Knight";
    case 7:
      return "Shaman";
    case 8:
      return "Mage";
    case 9:
      return "Warlock";
    case 10:
      return "Monk";
    case 11:
      return "Druid";
    case 12:
      return "Demon Hunter";
    case 13:
      return "Evoker";
    default:
      return null;
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

function itemLevelColor(itemLevel) {
  if (itemLevel > 420) {
    return "Red";
  }
  if (itemLevel > 415) {
    return "Orange";
  }
  if (itemLevel > 410) {
    return "Purple";
  }
  if (itemLevel > 400) {
    return "Blue";
  }
  if (itemLevel > 380) {
    return "Green";
  }
  if (itemLevel > 350) {
    return "White";
  } else return "Gray";
}

module.exports = async function seedMembers() {
  try {
    let { data } = await axios.get(
      `${BEGIN_URL_GUILD}/roster${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
    );

    data.members.forEach(async (member, i) => {
      member.character.guildRankId = member.rank;
      member.character.guildRank = rankFinder(member.rank);
      member.character.class = classFinder(member.character.playable_class.id);
      await setTimeout(async () => {
        try {
          if (member.character.level !== 1) {
            try {
              let { data } = await axios.get(
                `${BEGIN_URL_CHARACTER}${member.character.name.toLowerCase()}${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
              );
              member.character.spec = data.active_spec.name;
              member.character.role = roleFinder(data.active_spec.name);
              member.character.classColor = classColor(member.character.class);
              member.character.playable_class.name = member.character.class;
              member.character.itemLevel = data.average_item_level;
              member.character.itemLevelColor = itemLevelColor(
                member.character.itemLevel
              );
            } catch (err) {}
            try {
              let { data } = await axios.get(
                `${BEGIN_URL_CHARACTER}${member.character.name.toLowerCase()}/character-media${CONFIG_URL_PLAYER}${await GET_TOKEN()}`
              );
              member.character.avatarMedia = data.assets[0].value;
              member.character.insetMedia = data.assets[1].value;
              member.character.mainMedia = data.assets[2].value;
              member.character.mainRawMedia = data.assets[3].value;
            } catch (err) {
              console.log("Problem Loading:", member.character.name);
              data =
                "https://www.citypng.com/public/uploads/preview/png-red-question-symbol-mark-icon-11664604913fofuexjtok.png";
              member.character.avatarMedia = data;
              member.character.insetMedia = data;
              member.character.mainMedia = data;
              member.character.mainRawMedia = data;
            }
            try {
              let { data } = await axios.get(
                `https://raider.io/api/v1/characters/profile?region=us&realm=illidan&name=${member.character.name}&fields=mythic_plus_scores`
              );
              member.character.mythicPlusScore = data.mythic_plus_scores.all
            } catch (err) {}

            Member.create(member.character);
          }
        } catch (err) {}
      }, i * 40);
    });
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
};
