const axios = require("axios");
const { db } = require("./db");
const Class = require("./models");

async function seed() {
  try {
    console.log("attempt to seed")
    const classes = await axios.get(`/api/class`);
    //console.log(classes)
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    //console.error(err);
  }
}

module.exports = seed;

// const seed = async () => {
//   try {
//     await db.sync({ force: true });

//     await Promise.all(
//       candies.map((candy) => {
//         return Candy.create(candy);
//       })
//     );

//     console.log(green("Seeding success!"));
//     db.close();
//   } catch (err) {
//     console.error(red("Oh noes! Something went wrong!"));
//     console.error(err);
//     db.close();
//   }
// };

// seed();
