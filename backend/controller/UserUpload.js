const multer = require("multer");
const path = require("path");
// const cloudinary = require("./Cloud/CloudNary");
// const { userdata } = require("../routes/route");
// console.log(userdata);
const { User } = require("../models/user-model");

//first i am defining a storage the file will store
//and the filename
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// initialize upload middleware
const upload = multer({ storage: storage }).single("image");
const upload2 = multer({ storage: storage }).single("video");

// handeling image upload

const UserImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "File upload failed", details: err });
    }

    console.log(req.file);
    console.log(req.user);

    const file = req.file;

    try {
      // Cloudinary upload
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "folder_name",
        quality: "auto:eco",
      });
      res.json({ imageUrl: result.secure_url });
      console.log(result.secure_url);
      console.log(result);
      console.log(`image size , ${result.bytes / 1024}kb`);

      // Save to database
      const userId = req.user._id;

      await User.findByIdAndUpdate(
        userId,
        { $push: { CreatedProject: [{ image: result.secure_url }] } },
        { new: true }
      );

      console.log("File is uploaded and saved to DB");
    } catch (error) {
      console.error("Error uploading to Cloudinary or saving to DB", error);
      res.status(500).json({ error: "Upload failed", details: error.message });
    }
  });
};

const UserVideo = async (req, res) => {
  upload2(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "File upload failed", details: err });
    }

    console.log("user Uploaded file", req.file);

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        quality: "auto:eco",
      });
      res.json({ imageUrl: result.secure_url });
      console.log(result);
      console.log(result);
      console.log(`image size , ${result.bytes / 1024}kb`);

      //save to database
      const userId = req.user._id;

      if (result.secure_url) {
        await User.findByIdAndUpdate(userId, {
          $push: { CreatedProject2: [{ video: result.secure_url }] },
        });
        console.log("File is uploaded and save to db");
      } else {
        console.log("Not got the url");
      }
    } catch (error) {}
  });

  // if (userId) {
  //   try {
  //     // const result = await cloudinary.uploader.upload(req.)
  //   } catch (error) {}
  // } else {
  //   res.json({ msg: "User is not Logged in" });
  // }
};

const GetImage = async (req, res) => {
  const userId = req.user.id;
  try {
    const image = await UserData.find({ UserId: userId });
    console.log(image);
  } catch (error) {}
};

module.exports = { GetImage, UserImage, UserVideo };
