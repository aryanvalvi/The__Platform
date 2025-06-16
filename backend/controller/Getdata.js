const passport = require("passport")
let userdata
const logIn = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile"],
  })(req, res, next)
}

const Redirect = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
    (req, res) => {
      console.log(req.user)
      res.redirect("http://localhost:5173")
    }
}

const Logout = (req, res) => {
  req.logout()
  res.redirect("http://localhost:5173")
}

const GetUser = (req, res) => {
  res.send(req.user)
  console.log(userdata)
}
const getdata = (req, res) => {}

module.exports = {logIn, Redirect, Logout, GetUser, getdata}
