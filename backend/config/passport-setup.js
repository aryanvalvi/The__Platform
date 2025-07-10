const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
require("dotenv").config()
const User = require("../models/UserSchema")
const {cloudinary} = require("../controller/Cloud/CloudNary")
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({storage})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let currentUser = await User.findOne({googleID: profile.id})
        if (currentUser) {
          return done(null, currentUser)
        }

        const GoogleImageUrl = profile.photos[0].value

        const Cloudimg = await cloudinary.uploader.upload(GoogleImageUrl, {
          folder: "userImage",
        })

        const newUser = await new User({
          username: profile.displayName,
          userImage: Cloudimg.secure_url,
          googleID: profile.id,
        }).save()

        done(null, newUser)
      } catch (error) {
        console.error("Error while saving to DB:", error)
        return done(error, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})
