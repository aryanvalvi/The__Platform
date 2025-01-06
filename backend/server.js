const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passportSetup = require("./config/passport-setup");
const cookieParser = require("cookie-parser");
const profileRoute = require("./routes/profile-route");
const passport = require("passport");
const router = require("./routes/route");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Session management
app.use(
  session({
    secret: "asdasfafverwfrvv",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  })
);

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, "image")));
app.use(express.static(path.join(__dirname, "cimage")));

// Route handlers
app.use("/", require("./routes/route"));
app.use("/auth", router);
app.use("/profile", profileRoute);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
