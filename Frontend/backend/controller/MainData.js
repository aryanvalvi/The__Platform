const { User } = require("../models/user-model");
//all the data
const MainData = async (req, res) => {
  const result = await User.find();
  res.json(result);
  console.log(
    result.map((e) => {
      console.log(e.LikedContent);
    })
  );
};

//user data

//other user data
module.exports = MainData;
