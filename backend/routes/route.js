const express = require("express")
const router = express()
const explore = require("../controller/Explore")
const passport = require("passport")
const multer = require("multer")
const path = require("path")
const {UserData} = require("../models/user-model")
const {getdata} = require("../controller/Getdata")
const search = require("../controller/Search")
const {
  newConversation,
  getConversations,
} = require("../controller/ConverSationAndMessage/conversation/conversation")
const {
  sendMessage,
  getMessages,
  getLatestMessage,
  deleteAllMessages,
} = require("../controller/ConverSationAndMessage/message/messages")
require("dotenv").config()
const {
  UserInteraction,
  Check,
  Dashboard,
  getUserProfile,
  SendProposal,
  HandleSavedDesigns,
  OtherProfile,
  UserInteraction2,
} = require("../controller/UserInteraction")
const {
  testApi,
  GetData,
  getUserPersonal,
  GetMoreData,
  DeleteAll,
  GetUserDesign,
} = require("../controller/GetUserdata")
const {
  UserPostMedia,
  UserPostUpdateMedia,
  // GetImage,
  // UserPostImage,
  // UserVideo,
  // Both,
} = require("../controller/UserUpload")
const {Cloud} = require("../controller/Cloud/CloudNary")
const MainData = require("../controller/MainData")
let userdata
let userimagelocation

//User Data image/video

router.get("/explore", MainData)

//auth login
router.get(
  "/google",
  passport.authenticate("google", {scope: ["profile", "email"]})
)
//auth redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    // console.log(req.user);
    res.redirect(process.env.FRONTEND_URL)
    console.log(process.env.GOOGLE_CLIENT_ID)
  }
)
//auth getuserdata;
router.get("/getuserdata", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    })
    // console.log("bhadve", req.user);
  } else {
    res.json({user: null})
  }
})

//auth Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.send("Error while logout")
    }
    req.session.destroy(err => {
      if (err) {
        console.log("Error destryoing session", err)
      }
      res.clearCookie("connect.sid"),
        // res.redirect("http://localhost:3000")
        res.json({message: "logged out be"})
      console.log("Logged Out Successfully")
    })
  })
})

//data getting
router.get("/myproject", async (req, res) => {
  try {
    const UserName = userdata.username
    console.log(UserGanduName)

    const existingUser = await UserData.findOne({username: UserName})
    if (existingUser) {
      const {image, description} = existingUser
      const exportData = [
        {
          id: Date.now(),
          image: `/${image}`,
          des: description,
        },
      ]
      res.json(exportData)
      console.log(exportData)
    } else {
      console.log("User not found")
      res.json({message: "User not found"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Internal server error"})
  }
})

//file upload

router.post("/xyz", UserPostMedia)
router.put("/update/:id", UserPostUpdateMedia)
// router.post("/UserVideoUpload", UserVideo)
// router.post("/both", Both)
// router.post("/z", GetImage)

//Get user Data
router.get("/Getdata", GetData)
router.post("/getmore", GetMoreData)
router.post("/getUserPersonal", getUserPersonal)
router.get("/test", testApi)
router.post("/delete", DeleteAll)
router.post("/getuserdesign", GetUserDesign)
router.post("/userInteraction", UserInteraction)
router.post("/userInteraction2", UserInteraction2)
router.post("/Check/:postId", Check)
router.post("/dashboard", Dashboard)
router.post("/profile/:id", OtherProfile)
router.get("/getprofile", getUserProfile)
router.post("/sendproposal", SendProposal)
router.post("/savedDesigns", HandleSavedDesigns)
//Upload User Data

// router.post("/userUpload", uploadUser);

//Chat System Routes

router.post("/conversationid", newConversation)
router.get("/dashboard/chat/conversations", getConversations)
router.post("/chat/newMessage", sendMessage)
router.get("/dashboard/chat/:conversationId", getMessages)
router.post("/dashboard/chat/latest", getLatestMessage)
router.delete("/delete", deleteAllMessages)

router.get("/f", (req, res) => {
  console.log(req.user.id)
})

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})

const upload2 = multer({storage2})
// router.post("/uploadImg", upload2.single("avatar"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

module.exports = router
//  userdata };
router.get("/L", Cloud)
const ensureAuthenticated = (req, res, next) => {
  console.log("Checking authentication")
  if (req.isAuthenticated()) {
    console.log("Authenticated user:", req.user)
    return next()
  }
  res.status(401).json({message: "Unauthorized"})
}
router.post("/W", ensureAuthenticated, (req, res) => {
  res.json(req.user)
  console.log("user", req.user)
})
router.get("/search", search)
