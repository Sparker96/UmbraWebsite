const db = require("./database/db");
const app = require("./index.js");
const PORT = process.env.PORT || 3000;


db.sync(/*{force:true}*/)
  .then(function () {
    app.listen(PORT, () =>
      console.log(`Listening on port ${PORT} @ http://localhost:${PORT}/`)
    );
  });
