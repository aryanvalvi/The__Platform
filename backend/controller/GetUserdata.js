const DesignUpload = require("../models/DesignSchema");
const User = require("../models/UserSchema");
const GetData = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 2;

  const startIndex = (page - 1) * limit;

  // Get the total number of documents
  const totalDocs = await DesignUpload.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);

  const post = await DesignUpload.find()
    .populate("creator")
    .skip(startIndex)
    .limit(limit);
  res.json({
    data: post,
    currentPage: page,
    totalPages, // Send total pages to the frontend
  });
  console.log("get Function called", post.length);
};

const getUserPersonal = async (req, res) => {
  console.log("getting", req.body);
  const ID = req.body;
  const users = await User.find({ _id: { $in: ID } });
  if (users) {
    console.log("user i am getting is", users);
    res.status(200).json(users);
  }
};

const GetMoreData = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const user = await DesignUpload.findById(id).populate("creator");

    if (user) {
      res.status(200).json(user);
    } else {
      console.log("User is not there");
    }
  } catch (error) {}
};

const testApi = async (req, res) => {
  const ProfileImage = await User.findById(req.user._id);
  res.json(ProfileImage);
  console.log(ProfileImage);
};

const DeleteAll = async (req, res) => {
  const result = await DesignUpload.deleteMany({});
  res.json(result);
};

const GetUserDesign = async (req, res) => {
  const result = await DesignUpload.find({ ceator: req.body.id });
  res.json(result);
};
module.exports = {
  GetData,
  getUserPersonal,
  GetMoreData,
  testApi,
  DeleteAll,
  GetUserDesign,
};
