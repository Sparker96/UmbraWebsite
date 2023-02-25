const axios = require("axios");
const db = require("../db");
const { Token, Member } = require("../models/index");

// const BEGIN_URL_CLASS = "https://us.api.blizzard.com/data/wow/playable-class/";
// const CONFIG_URL_DATA = "?namespace=static-us&locale=en_US";

const BEGIN_URL_CHARACTER =
  "https://us.api.blizzard.com/profile/wow/character/illidan/";
const BEGIN_URL_GUILD =
  "https://us.api.blizzard.com/data/wow/guild/illidan/umbra";
const CONFIG_URL_PLAYER = "?namespace=profile-us&locale=en_US";
const GET_TOKEN = async () => {
  const { dataValues } = await Token.findByPk(1);
  return `&access_token=${dataValues.access_token_bnet}`;
};

function guildRankCalc(rankId) {
  let rankArr = [
    "Guild Master",
    "CO-Guild Master",
    "Officer",
    "Officer Alt",
    "Core Raider",
    "Core Sub",
    "Trial Raider",
    "Member",
  ];
  return rankArr[rankId];
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

function classFinder(classId) {
  let classArr = [
    null,
    "Warrior",
    "Paladin",
    "Hunter",
    "Rogue",
    "Priest",
    "Death Knight",
    "Shaman",
    "Mage",
    "Warlock",
    "Monk",
    "Druid",
    "Demon Hunter",
    "Evoker",
  ];
  return classArr[classId];
}

function classColor(charClass) {
  let classColorObj = {
    "Death Knight": "#C41E3A",
    "Demon Hunter": "#A330C9",
    Druid: "#FF7C0A",
    Evoker: "#33937F",
    Hunter: "#AAD372",
    Mage: "#3FC7EB",
    Monk: "#00FF98",
    Paladin: "#F48CBA",
    Priest: "#FFFFFF",
    Rogue: "#FFF468",
    Shaman: "#0070DD",
    Warlock: "#8788EE",
    Warrior: "#C69B6D",
  };
  return classColorObj[charClass];
}

function isRaider(name) {
 let raiderArr = ["Seidou",
 "Veranysla",
 "Seagk",
 "Töasterg",
 "Goggl",
 "Seineren",
 "Holylitez",
 "Killars",
 "Fubes",
 "Warsavant",
 "Nttdk",
 "Keldrimp",
 "Jyxti",
 "Bearhots",
 "Carnrac",
 "Muajawar",
 "Stickybeast",
 "Schyllidan",
 "Sheatszu"]
  return raiderArr.includes(name);
}

function itemLevelColor(itemLevel) {
  if (itemLevel > 420) {
    return "Biege";
  }
  if (itemLevel >= 418) {
    return "Pink";
  }
  if (itemLevel >= 415) {
    return "Orange";
  }
  if (itemLevel >= 410) {
    return "Purple";
  }
  if (itemLevel >= 405) {
    return "Blue";
  }
  if (itemLevel >= 400) {
    return "Green";
  }
  if (itemLevel >= 390) {
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
      member.character.guildRank = guildRankCalc(member.rank);
      member.character.class = classFinder(member.character.playable_class.id);
      member.character.isRaider = isRaider(member.character.name);
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
              member.character.mythicPlusScore = data.mythic_plus_scores.all;
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
