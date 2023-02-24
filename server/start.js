const db = require("./database/db");
const seed = require("./database/seed")
const { app, fetchToken } = require("./index.js");
const PORT = process.env.PORT;
const { Token, Member, Raider } = require("./database/models/index");

async function saveToken() {
  try {
    await db.sync({ force: true });
    await Token.create({ access_token: await fetchToken() });
  } catch (err) {
    console.error("Oh noes! Something went wrong!");
    console.error(err);
    db.close();
  }
}

saveToken().then(function () {
  console.log("Database Synced");
  app.listen(PORT, () =>
    console.log(`Listening on port ${PORT} @ http://localhost:${PORT}/`)
  );
});
