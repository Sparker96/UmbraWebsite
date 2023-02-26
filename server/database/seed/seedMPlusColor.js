const axios = require("axios");
const db = require("../db");
const { MPlusColor } = require("../models/index");

module.exports = async function seedMPlusColor() {
  try {
    let { data } = await axios.get(
      `https://raider.io/api/v1/mythic-plus/score-tiers`
    );
    await MPlusColor.bulkCreate(data);
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
};