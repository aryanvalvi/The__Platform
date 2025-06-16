const DesignUpload = require("../models/DesignSchema")
const User = require("../models/UserSchema")

const GetData = async (req, res) => {
  console.log("GetData Called")
  const page = parseInt(req.query.page) || 0
  console.log(page)
  const DEFAULAT_LIMIT = 6
  const skip = (page - 1) * DEFAULAT_LIMIT
  try {
    // console.log(skip, DEFAULAT_LIMIT);
    const totalPost = await DesignUpload.countDocuments()
    if (skip >= totalPost) {
      return res.status(200).json({
        sucess: true,
        message: "No More Post available",
        data: [],
      })
    }

    const posts = await DesignUpload.find({})
      .populate("creator")
      .skip(skip)
      .limit(DEFAULAT_LIMIT)

    res.status(200).json({sucrress: true, data: posts, totalPost})
  } catch (error) {
    res.status(400).json({
      error: `Error getting posts:${error.message}`,
    })
  }
}

const getUserPersonal = async (req, res) => {
  console.log("getting", req.body)
  const ID = req.body
  const users = await User.find({_id: {$in: ID}})
  if (users) {
    console.log("user i am getting is", users)
    res.status(200).json(users)
  }
}

const GetMoreData = async (req, res) => {
  const {id} = req.body
  console.log(id)
  try {
    const user = await DesignUpload.findById(id).populate("creator")

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json(null)
      console.log("User is not there")
    }
  } catch (error) {
    res.status(404).json(null)
    console.log("User is not there")
  }
}

const testApi = async (req, res) => {
  const ProfileImage = await User.findById(req.user._id)
  res.json(ProfileImage)
  console.log(ProfileImage)
}

const DeleteAll = async (req, res) => {
  const result = await DesignUpload.deleteMany({})
  res.json(result)
}

const GetUserDesign = async (req, res) => {
  const result = await DesignUpload.find({ceator: req.body.id})
  res.json(result)
}
module.exports = {
  GetData,
  getUserPersonal,
  GetMoreData,
  testApi,
  DeleteAll,
  GetUserDesign,
}
