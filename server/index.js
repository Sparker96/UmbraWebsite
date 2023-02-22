const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const axios = require("axios");


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



//Logging Middleware
app.use(morgan("dev"));

//Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static File Middleware
app.use(express.static(path.join(__dirname, "../public")));

//Routing
app.use("/api", require("./apiRoutes"));

//SPA HomePage
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//500 Error Handling
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = { app, fetchToken};




// const passport = require("passport");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const BnetStrategy = require("passport-bnet").Strategy;


// const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL;
// // Review full list of available scopes here: https://develop.battle.net/documentation/guides/using-oauth
// const OAUTH_SCOPES = process.env.OAUTH_SCOPES;

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// // Register the BnetStrategy within Passport.
// passport.use(
//   new BnetStrategy(
//     {
//       clientID: BNET_ID,
//       clientSecret: BNET_SECRET,
//       scope: OAUTH_SCOPES,
//       callbackURL: OAUTH_CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       process.nextTick(function () {
//         return done(null, profile);
//       });
//     }
//   )
// );

// // configure Express
// app.use(cookieParser());
// app.use(
//   session({
//     secret: "passport-battlenet-example", // Change this value to a unique value for your application!
//     saveUninitialized: true,
//     resave: true,
//   })
// );

// // Initialize Passport! Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/oauth/battlenet", passport.authenticate("bnet"));

// app.get(
//   "/oauth/battlenet/callback",
//   passport.authenticate("bnet", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/login");
//   }
// );

// app.get("/login", function (req, res) {
//   if (req.isAuthenticated()) {
//     const output = `
//     <html>
//       <body>
//         <h1>Express Passport-Bnet OAuth Example</h1>
//         <table>
//           <tr>
//             <th>Account ID</th>
//             <th>Battletag</th>
//           </tr>
//           <tr>
//             <td>${req.user.id}</td>
//             <td>${req.user.battletag}</td>
//           </tr>
//         </table>
//         <br />
//         <a href="/logout">Logout</a>
//       </body>
//     </html>
//   `;
//     res.send(output);
//   } else {
//     const output = `
//     <html>
//       <body>
//         <h1>Express Passport-Bnet OAuth Example</h1>
//         <br />
//         <a href="/oauth/battlenet">Login with Bnet</a>
//       </body>
//     </html>
//   `;
//     res.send(output);
//   }
// });

// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

// app.use(function (err, req, res, next) {
//   console.error(err);
//   res.send("<h1>Internal Server Error</h1>");
// });
