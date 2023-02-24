const seed = require("./database/seed")
const { app } = require("./index.js");
const PORT = process.env.PORT;


seed().then(function () {
  console.log("Database Synced");
  app.listen(PORT, () =>
    console.log(`Listening on port ${PORT} @ http://localhost:${PORT}/`)
  );
});
