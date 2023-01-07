// what i've done
/* 
1. i already develop restful API with CRUD feature, i already testing it with postman
2. i already build oauth2 google
*/

// My issue
/* 
1. i cant understand how to make middleware to protect server from user who want to access data without login otherwise user can access
other route or endpoint without login
2. i cant make views for my login page and data page looks better with html or css or tailwind css because i use 
the atomic style where it to structuring my file with grouping in some folder(in a side it looks estetic and easy to read but the 
  other side its make me confuse because the common documentation not using that way)
*/

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

// authentication
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://provider-url/oauth2/authorize",
      tokenURL: "https://provider-url/oauth2/token",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // code to handle user profile and
      // create or update user account goes here
      done(null, profile);
    }
  )
);

app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.send(`
  <link rel="stylesheet" href="/css/style.css">
    <form action="/login" method="post">
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password"><br><br>
      <input type="submit" value="Submit">
      <a href="/auth/google">Login with Google</a>
    </form> 
  `);
});

app.get("/auth/google", (req, res) => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const redirectURI = "http://localhost:4000/farms";
  const scope = "https://www.googleapis.com/auth/plus.login";
  const authorizationURL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code`;
  res.redirect(authorizationURL);
});

app.get("/logout", (req, res) => {
  // akses URL logout Google untuk mengakhiri sesi
  res.redirect("https://accounts.google.com/logout");
  // kembali ke halaman login setelah mengakhiri sesi
  res.redirect("/login");
});

// export route
const farmsRoutes = require("./routes/farms.js");

// export middleware
const middlewareLogRequest = require("./middleware/logs");
const upload = require("./middleware/multer.js");

// app.method(path, handler);

// middleware for whole script
app.use(middlewareLogRequest);

app.use(express.json());
app.use("/assets", express.static("public/images"));

app.use("/farms", farmsRoutes);
app.get("/login", (req, res) => {
  res.render("login");
});

// middleware for specific script
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    message: "Upload berhasil",
  });
});

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

// set port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
