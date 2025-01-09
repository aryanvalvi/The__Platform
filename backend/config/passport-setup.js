const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../models/UserSchema");
const { cloudinary } = require("../controller/Cloud/CloudNary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let currentUser = await User.findOne({ googleID: profile.id });
        if (currentUser) {
          // console.log("Current User: ", currentUser);
          return done(null, currentUser);
        }

        // Get the profile image URL from Google
        const GoogleImageUrl = profile.photos[0].value;

        // Upload the image to Cloudinary
        const Cloudimg = await cloudinary.uploader.upload(GoogleImageUrl, {
          folder: "userImage",
        });

        // Create and save the new user in the database
        const newUser = await new User({
          username: profile.displayName,
          userImage: Cloudimg.secure_url, // Save the Cloudinary image URL
          googleID: profile.id,
        }).save();

        // console.log(`New user is created: ${newUser}`);
        done(null, newUser);
      } catch (error) {
        console.error("Error while saving to DB:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
