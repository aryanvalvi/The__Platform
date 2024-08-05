const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  GanduKiImage: String,
  googleID: { type: String, unique: true },
  UserId: String,
  ImageName: String,
  LikedContent: [],
  savedContent: [],
  follower: [],
  following: [],
  bio: String,
  location: String,
  Links: [],
  CreatedProject1: [{ image: String, Des: String }],
  CreatedProject2: [{ video: String, Des: String }],
  CreatedProject3: [{ image: String, video: String, Des: String }],
  Save: [],
  like: [],
  CoverPhoto: String,
});

const userdata = new Schema({
  username: String,
  UserId: String,
  filename: String,
  filepath: String,
  originalname: String,
  image: String,
  description: String,
  username: String,
  imageUrl: String,
});

const User = mongoose.model("user", userSchema);
const UserData = mongoose.model("userdata", userdata);

module.exports = { User, UserData };
