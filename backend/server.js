const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const cors = require("cors")
const path = require("path")
const passportSetup = require("./config/passport-setup")
const cookieParser = require("cookie-parser")
const profileRoute = require("./routes/profile-route")
const passport = require("passport")
const router = require("./routes/route")
const mongoose = require("mongoose")
const session = require("express-session")

require("dotenv").config()

const client = require("./elasticSearchSync/sync")
// Middleware setup
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const allowOriginsare = process.env.frontendUrl.split(",")
app.use(
  cors({
    origin: allowOriginsare,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

// Session management
app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}, // Set to `true` if using HTTPS
  })
)

// Passport.js setup
app.use(passport.initialize())
app.use(passport.session())

// Static files
app.use(express.static(path.join(__dirname, "image")))
app.use(express.static(path.join(__dirname, "cimage")))

// Route handlers
app.use("/", require("./routes/route"))
app.use("/auth", router)
app.use("/profile", profileRoute)
app.get("/testing", (req, res) => res.json("working"))
app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin)
  next()
})

// In your Express route
// app.get("/search", async (req, res) => {
//   const {query} = req.query
//   console.log(query)
//   try {
//     const result = await client.search({
//       index: "designs",
//       query: {
//         multi_match: {
//           query,
//           fields: ["title", "description", "tags"],
//         },
//       },
//     })
//     // console.log(result.hits.hits)
//     // res.json(result.hits.hits.map(hit => hit._source))
//     res.json(result.hits.hits)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Search failed")
//   }
// })

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log("Database connection error: " + err)
  })
// checkConnection()
// retrive()
server.listen(process.env.PORT || 5001, () => {
  console.log("Server is running on port 5001")
})
