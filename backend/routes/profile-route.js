const router = require("express").Router();

const authenticationn = (req, res, next) => {
  if (!req.user) {
    res.redirect("http://localhost/gandu");
  } else {
    next();
  }
};

router.get("/", authenticationn, (req, res) => {
  res.render("http://localhost:5173", { user: req.user });
});

module.exports = router;
