const express = require("express");
const router = express();
const explore = require("../controller/Explore");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const { UserData } = require("../models/user-model");
const { getdata } = require("../controller/Getdata");
const { GetImage, UserImage, UserVideo } = require("../controller/UserUpload");
const { Cloud } = require("../controller/Cloud/CloudNary");
const MainData = require("../controller/MainData");
let userdata;
let userimagelocation;

//User Data image/video

router.get("/explore", MainData);

//auth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//auth redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log(req.user);
    res.redirect("http://localhost:5173");
  }
);

//auth getuserdata;
router.get("/getuserdata", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    });
    console.log("bhadve", req.user);
  } else {
    res.json({ user: null });
  }
});

//auth Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send("Error while logout");
    } else {
      res.send("Log out");
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./clientImage/");
  },
  filename: (req, file, cb) => {
    console.log(file);

    userimagelocation =
      userdata.username + Date.now() + path.extname(file.originalname);

    const filename = cb(null, userimagelocation);
  },
});

const upload = multer({ storage: storage });
console.log(storage.getFilename.filename);
//Imageuploader
router.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image Uploaded");
});
router.post("/uploadData", async (req, res) => {
  const UserGanduName = userdata.username;
  const existingUser = await UserData.findOne({ username: UserGanduName });
  try {
    if (existingUser) {
      console.log("arealdy user is there");
    } else {
      const data = req.body;
      const newUserdata = new UserData({
        image: userimagelocation,
        username: userdata.username,
        description: data.des,
      });
      await newUserdata.save();
    }

    console.log("data is uploaded");
  } catch (error) {
    console.log(error);
  }
});

//data getting
router.get("/myproject", async (req, res) => {
  try {
    const UserName = userdata.username;
    console.log(UserGanduName);

    const existingUser = await UserData.findOne({ username: UserName });
    if (existingUser) {
      const { image, description } = existingUser;
      const exportData = [
        {
          id: Date.now(),
          image: `/${image}`,
          des: description,
        },
      ];
      res.json(exportData);
      console.log(exportData);
    } else {
      console.log("User not found");
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//file upload

router.post("/xyz", UserImage);
router.post("/UserVideoUpload", UserVideo);
router.post("/z", GetImage);

//Upload User Data

// router.post("/userUpload", uploadUser);

router.get("/f", (req, res) => {
  console.log(req.user.id);
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload2 = multer({ storage2 });
// router.post("/uploadImg", upload2.single("avatar"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
// });

module.exports = router;
//  userdata };
router.get("/L", Cloud);
