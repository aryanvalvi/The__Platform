const User = require("../models/UserSchema")
//all the data
const MainData = async (req, res) => {
  const result = await User.find()
  res.json(result)
  console.log(
    result.map(e => {
      console.log(e.LikedContent)
    })
  )
}

//user

//other user data
module.exports = MainData
