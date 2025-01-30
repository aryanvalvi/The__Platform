const multer = require("multer");
const path = require("path");
const DesignUpload = require("../models/DesignSchema");
const User = require("../models/UserSchema");
const fs = require("fs");

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
    const userFolder = path.join(
      __dirname,
      "./uploads",
      req.user._id.toString()
    );
    fs.mkdirSync(userFolder, { recursive: true });
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    const userFolder = path.join(
      __dirname,
      "./Videouploads",
      req.user._id.toString()
    );
    fs.mkdirSync(userFolder, { recursive: true });
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    // Save file with userId, timestamp, and original file extension
    const fileExtension = path.extname(file.originalname); // Get the original file extension
    cb(null, req.user._id.toString() + "-" + Date.now() + fileExtension);
  },
});
const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    const userFolder = path.join(
      __dirname,
      "./BothVideouploads",
      req.user._id.toString()
    );

    const fileTypeFolder = file.mimetype.startsWith("image/")
      ? "images"
      : "videos";

    const finalFolder = path.join(userFolder, fileTypeFolder);

    fs.mkdirSync(finalFolder, { recursive: true });
    cb(null, finalFolder);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Get the original file extension
    cb(null, req.user._id.toString() + "-" + Date.now() + fileExtension);
  },
});

const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
    const userFolder = path.join(
      __dirname,
      "./uploadsProfile",
      req.user._id.toString()
    );
    fs.mkdirSync(userFolder, { recursive: true });
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// initialize upload middleware
const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 },
]);
const upload2 = multer({ storage: storage2 }).fields([
  { name: "video", maxCount: 1 },
]);
const upload3 = multer({ storage: storage3 }).fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);
const upload4 = multer({ storage: storage4 }).fields([
  { name: "image", maxCount: 1 },
]);

// handeling User Image upload

const UserPostImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Not getting any file");
    } else {
      //Stage 1
      console.log("getting from first and this is image", req.files.image);
      console.log(
        "getting from first and this is description",
        req.body.description
      );
    }
    //Stage 2
    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return (
        console.log("Files is missing at stage 2"),
        res.status(400).json({ error: "Image file is missing" })
      );
    }

    //stage 3
    // Access the uploaded image file
    const imageFile = req.files.image[0];
    console.log("img file is at stage3", imageFile.path);

    //Getting Description and Title
    const Description = JSON.parse(req.body.description);
    console.log("Des and title", Description.Des, Description.Title);

    // checking user is there or nots
    if (req.user) {
      try {
        // Cloudinary upload
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: "folder_name",
          quality: "auto:eco",
        });
        const ProfileImage = await User.findById(req.user._id);
        const result2 = await cloudinary.uploader.upload(
          ProfileImage.userImage,
          {
            folder: "folder_name",
          }
        );
        console.log("ProfileImage", result2.secure_url);
        //stage 4
        console.log("url is at stage 4", result.secure_url);
        console.log(result);
        console.log(`image size , ${result.bytes / 1024}kb`);

        // Save to database
        const userId = req.user._id;

        await DesignUpload.create({
          UserProfileImage: result2.secure_url,
          title: Description.Title,
          description: Description.Des,
          images: result.secure_url,
          tags: req.body.tags,
          creator: userId,
          likes: [],
          saves: [],
          comments: [],
        });

        console.log("File is uploaded and saved to DB");
        res.status(200).json({success:true})
      } catch (error) {
        console.error("Error uploading to Cloudinary or saving to DB", error);
        res
          .status(500)
          .json({ success:false,error: "Upload failed", details: error.message });
      }
    } else {
      console.log("User is not logged in");
      res.status(401).json({ success:true, msg: "User is not logged in" });
    }
  });
};

const UserVideo = async (req, res) => {
  upload2(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "File upload failed", details: err });
    } else {
      //Stage 1
      console.log("getting from first and this is image", req.files.image);
      console.log(
        "getting from first and this is description",
        req.body.description
      );
    }
    //Stage 2
    if (!req.files || !req.files.video) {
      return (
        console.log("Files is missing at stage 2"),
        res.status(400).json({ error: "Image file is missing" })
      );
    }
    //stage 3
    // Access the uploaded video file
    const imageFile = req.files.video[0];
    console.log("img file is at stage3", imageFile.path);
    const ProfileImage = await User.findById(req.user._id);
    const result2 = await cloudinary.uploader.upload(ProfileImage.userImage, {
      folder: "folder_name",
    });
    console.log("ProfileImage", result2.secure_url);

    //Getting Description and Title
    const Description = JSON.parse(req.body.description);
    console.log("Des and title", Description.Des, Description.Title);
    if (req.user) {
      try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "video",
          quality: "auto:eco",
        });
        res.json({ imageUrl: result.secure_url });
        console.log(result);
        console.log(`image size , ${result.bytes / 1024}kb`);

        //save to database
        const userId = req.user._id;

        if (result.secure_url) {
          await DesignUpload.create({
            UserProfileImage: result2.secure_url,
            title: Description.Title,
            description: Description.Des,
            video: result.secure_url,
            tags: req.body.tags,
            creator: userId,
            likes: [],
            saves: [],
            comments: [],
          });

          // DesignUpload.findByIdAndUpdate(userId, {
          //   $push: { CreatedProject2: [{ video: result.secure_url }] },
          // });
          console.log("File is uploaded and save to db");
          res.status(200).json({success:true})
        } else {
          console.log("Not got the url");
        }
      } catch (error) {
        console.log("erro while both didnt work ", error);
        res.status(200).json({success:false})
      }
    } else {
      console.log("Req.user is not there");
      res.status(200).json({success:false})
    }
  });

  // if (userId) {
  //   try {
  //     // const result = await cloudinary.uploader.upload(req.)
  //   } catch (error) {}
  // } else {
  //   res.json({ msg: "User is not Logged in" });
  // }
};
const Both = async (req, res) => {
  upload3(req, res, async (err) => {
    if (err) {
      console.log("Not getting any file");
    } else {
      //Stage 1
      console.log("getting from first and this is image", req.files.image);
      console.log(
        "getting from first and this is description",
        req.body.description
      );
    }
    //Stage 2
    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return (
        console.log("Files is missing at stage 2"),
        res.status(400).json({ error: "Image file is missing" })
      );
    }

    //stage 3
    // Access the uploaded image and Video file
    const imageFile = req.files.image[0];
    const VideoFile = req.files.video[0];
    console.log("img file is at stage3", imageFile.path);
    const ProfileImage = await User.findById(req.user._id);
    const result2 = await cloudinary.uploader.upload(ProfileImage.userImage, {
      folder: "folder_name",
    });
    console.log("ProfileImage", result2.secure_url);

    //Getting Description and Title
    const Description = JSON.parse(req.body.description);
    console.log("Des and title", Description.Des, Description.Title);

    // checking user is there or nots
    if (req.user) {
      try {
        // Cloudinary upload
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: "folder_name",
          quality: "auto:eco",
        });
        const result2 = await cloudinary.uploader.upload(VideoFile.path, {
          folder: "folder_name",
          quality: "auto:eco",
          resource_type: "video",
        });
        res.json({ imageUrl: result.secure_url, VideoUrl: result2.secure_url });
        //stage 4
        console.log("Image url is at stage 4", result.secure_url);
        console.log(result);
        console.log(`image size , ${result.bytes / 1024}kb`);
        console.log("Video url is at stage 4", result.secure_url);
        console.log(result);
        console.log(`video size , ${result.bytes / 1024}kb`);

        // Save to database
        const userId = req.user._id;

        await DesignUpload.create({
          UserProfileImage: result2.secure_url,
          title: Description.Title,
          description: Description.Des,
          images: result.secure_url,
          video: result2.secure_url,
          tags: req.body.tags,
          creator: userId,
          likes: [],
          saves: [],
          comments: [],
        });

        console.log("File is uploaded and saved to DB");
        res.status(200).json({success:true})
      } catch (error) {
        console.error("Error uploading to Cloudinary or saving to DB", error);
        res
          .status(500)
          .json({success:false, error: "Upload failed", details: error.message });
      }
    } else {
      console.log("User is not logged in");
      res.status(401).json({success:false, msg: "User is not logged in" });
    }
  });
};

const GetImage = async (req, res) => {
  const userId = req.user.id;
  try {
    const image = await UserData.find({ UserId: userId });
    console.log(image);
  } catch (error) {}
};

module.exports = { GetImage, UserPostImage, UserVideo, Both };
