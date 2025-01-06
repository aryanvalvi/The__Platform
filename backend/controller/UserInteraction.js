const User = require("../models/UserSchema");
const DesignUpload = require("../models/DesignSchema");
const UserInteraction = async (req, res) => {
  const { action, recieverId } = req.body;
  const userId = req.user._id;

  switch (action) {
    case "follow":
      console.log(action, recieverId, userId);
      const receiver = await User.findByIdAndUpdate(
        recieverId,

        { $addToSet: { followers: userId } },
        { new: true }
      );
      const follower = await User.findByIdAndUpdate(userId, {
        $addToSet: { following: recieverId },
      });
      if (receiver && follower) {
        console.log(receiver, follower);
        res.json({ data: true });
      } else {
        console.log("not get reciever");
      }
      break;
    case "like":
      console.log(action, recieverId, userId);
      const receiver2 = await User.findByIdAndUpdate(
        recieverId,

        { $addToSet: { likedBY: userId } },
        { new: true }
      );
      const liker = await User.findByIdAndUpdate(userId, {
        $addToSet: { likedDesigns: recieverId },
      });
      if (receiver2 && liker) {
        // console.log(receiver, follower);
        res.json({ data: true });
      } else {
        console.log("not get reciever");
      }

      break;
    case "save":
      console.log(action, recieverId, userId);
      const UserSaver = await User.findByIdAndUpdate(
        userId,

        { $addToSet: { savedDesigns: recieverId } },
        { new: true }
      );

      if (UserSaver) {
        //  console.log(receiver, follower);
        res.json({ save: true });
      } else {
        console.log("not get reciever");
      }
      break;
    case "GetInTouch":
      break;
  }
};

const Check = async (req, res) => {
  if (req.user) {
    const { receiver } = req.body;
    const userId = req.user._id;

    // checking following
    try {
      const user1 = await User.findById(userId);
      const user2 = await User.findById(receiver);

      const checker1 = user1.following.some(
        (userId) => userId.toString() === receiver
      );
      const SaveChecker = user1.savedDesigns.some(
        (id) => id.toString() === receiver
      );
      const LikeChecker = user1.likedDesigns.some(
        (id) => id.toString() === receiver
      );
      console.log("here", checker1, SaveChecker, LikeChecker);
      res.json({
        follow: checker1,
        save: SaveChecker,
        like: LikeChecker,
      });

      // console.log("here is the creator id", follow, save, like);
    } catch (error) {
      console.log("error in follow save like");
    }
  }
};

const Dashboard = async (req, res) => {
  const { id } = req.body;
  const id2 = req.user._id;
  console.log(id, id2);

  try {
    const IsUserAdmin = await User.findById(id);
    console.log("king", IsUserAdmin);
    const IdMatcher = id2.toString() === IsUserAdmin._id.toString();
    console.log(IdMatcher);

    const response = await DesignUpload.find({ creator: id });
    if (!response) {
      console.log("No Post");
      res.json({ data: false });
    }
    res.json({ data: response, IdMatched: IdMatcher, Admin: IsUserAdmin });
    // console.log("Here is res", response);
  } catch (error) {
    res.json({ data: false });
  }
};
module.exports = { UserInteraction, Check, Dashboard };
