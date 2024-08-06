const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passportSetup = require("./config/passport-setup");
const cookieParser = require("cookie-parser");
const profileRoute = require("./routes/profile-route");
const cookieSession = require("cookie-session");
const passport = require("passport");
const router = require("./routes/route");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  const data = [
    {
      name: "aryan",
    },
  ];
  res.json(data);
});

app.use(
  session({
    secret: "asdasfafverwfrvv",
    resave: false,
    saveUninitialized: false,
  })
);
// app.use(cookieParser());

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["afsfaefafafeaff"],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

//connection to the database
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("lavde error" + err);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "image")));
app.use(express.static(path.join(__dirname, "cimage")));

app.use("/", require("./routes/route"));

app.use("/auth", router);
app.use("/profile", profileRoute);

app.listen(5000, () => {
  console.log("server is running on the port 5000");
});
