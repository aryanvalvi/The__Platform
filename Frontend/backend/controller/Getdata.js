const passport = require("passport");
let userdata;
const logIn = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile"],
  })(req, res, next);
};
// const Redirect = (req, res, next) => {
//   passport.authenticate("google", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.redirect("/");
//     userdata = req.user;
//     res.redirect(`http://localhost:5173`);
//     console.log("userdata is", req.user);
//     res.json(req.user);
//   })(req, res, next);
// };

const Redirect = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
    (req, res) => {
      console.log(req.user);
      res.redirect("http://localhost:5173");
    };
};

const Logout = (req, res) => {
  req.logout();
  res.redirect("http://localhost:5173");
};

const GetUser = (req, res) => {
  res.send(req.user);
  console.log(userdata);
};
const getdata = (req, res) => {};

module.exports = { logIn, Redirect, Logout, GetUser, getdata };
