const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
const { User } = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({ googleID: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            console.log("Current User" + currentUser);
            done(null, currentUser);
          } else {
            new User({
              username: profile.displayName,
              GanduKiImage: profile.photos[0].value,
              googleID: profile.id,
            })
              .save()
              .then((newuser) => {
                console.log(
                  `new user is created ${newuser}`,
                  done(null, newuser)
                );
              })
              .catch((err) => {
                console.log(`error ho gaya bhai ${err} `);
                done(null, err);
              });
          }
        })
        .catch((err) => {
          console.log(`error while saving in to fucking DB ${err}`);
          return done(err, null);
        });
    }
  )
);
