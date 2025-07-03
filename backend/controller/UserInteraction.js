const User = require("../models/UserSchema")
const DesignUpload = require("../models/DesignSchema")
const {UserData} = require("../models/user-model")
const UserInteraction = async (req, res) => {
  const {action, post} = req.body
  const userId = req.user._id
  console.log("postId", post)
  const design = await DesignUpload.findById(post)
  console.log("design", design)
  switch (action) {
    case "follow":
      console.log(action, post, userId)

      const admin = await User.findById(post)
      const isFollowing = admin.followers.includes(userId)
      if (isFollowing) {
        //unfollow

        await User.findByIdAndUpdate(post, {
          $pull: {followers: userId},
        })
        await User.findOneAndUpdate(userId, {
          $pull: {
            following: post,
          },
        })
        res.json({follow: false})
      } else {
        //follow

        await User.findOneAndUpdate(post, {
          $addToSet: {
            followers: userId,
          },
        })
        await User.findByIdAndUpdate(userId, {
          $addToSet: {following: post},
        })

        res.json({follow: true})
      }

      break

    case "like":
      console.log(action, post, userId)

      console.log("postId", post)
      if (design.likes.includes(userId)) {
        design.likes = design.likes.filter(
          id => id.toString() !== userId.toString()
        )
        await design.save()
        return res.status(200).json({like: false})
      } else {
        design.likes.push(userId)
        await design.save()
        return res.status(200).json({like: true})
      }
      break
    case "save":
      console.log("saveeeee", action, post, userId)
      const user = await User.findById(userId)
      const isSaved = user.savedDesigns.includes(post)

      if (isSaved) {
        // Unsave
        await User.findByIdAndUpdate(userId, {
          $pull: {savedDesigns: post},
        })
        res.json({save: false})
      } else {
        // Save
        await User.findByIdAndUpdate(userId, {
          $addToSet: {savedDesigns: post},
        })
        res.json({save: true})
      }
      break
  }
}

const Check = async (req, res) => {
  if (req.user) {
    const {receiver} = req.body
    const userId = req.user._id

    console.log("check", receiver, userId)
    // checking following
    try {
      const user1 = await User.findById(userId)
      const user2 = await DesignUpload.findById(receiver)
      console.log("here is my post", user2)

      const checker1 = user1.following.some(
        userId => userId.toString() === receiver
      )
      const SaveChecker = user1.savedDesigns.some(
        id => id.toString() === receiver
      )
      const LikeChecker = user2.likes.includes(userId)
      console.log("here2", checker1, SaveChecker, LikeChecker)
      res.json({
        follow: checker1,
        save: SaveChecker,
        like: LikeChecker,
      })

      // console.log("here is the creator id", follow, save, like);
    } catch (error) {
      console.log("error in follow save like")
    }
  }
}

//send proposal
const SendProposal = async (req, res) => {
  const {post, message, budget} = req.body
  console.log("send proposal", post, message, budget)
  const userid = req.user._id
  console.log("send proposal", userid)

  try {
    if (post) {
      const userPost = await User.findById(post)
      if (!userPost) {
        console.log("user not found")
      }
      userPost.messages.push({message, budget, senderId: userid})
      await userPost.save()

      res
        .status(200)
        .json({success: true, message: "Message and budget sent successfully"})
    }
  } catch (error) {
    console.log("Send proposal not work because of", error)
  }
}

// const Dashboard = async (req, res) => {
//   const {id} = req.body
//   const id2 = req.user._id
//   console.log("from body", id, "from google", id2)

//   try {
//     const IsUserAdmin = await User.findById(id)
//     console.log("king", IsUserAdmin)
//     const IdMatcher = id2.toString() === IsUserAdmin._id.toString()
//     console.log(IdMatcher)

//     // if (IdMatcher) {
//     const response = await DesignUpload.find({creator: id})
//     // }

//     if (!response) {
//       console.log("No Post")
//       res.json({data: false})
//     }
//     console.log("response from Dashboard backend", response.length)
//     res.json({data: response, IdMatched: IdMatcher, Admin: IsUserAdmin})
//     // console.log("Here is res", response);
//   } catch (error) {
//     res.json({data: false})
//   }
// }

const Dashboard = async (req, res) => {
  console.log("dashboard called")
  try {
    const loggedInUserId = req.user._id
    const userDesign = await DesignUpload.find({creator: loggedInUserId})
    const user = await User.findById(loggedInUserId)

    if (!user) {
      return res.status(404).json({message: "User not found"})
    }

    res.json({
      design: userDesign,
      user: user,
      isOwner: true,
    })
  } catch (error) {
    console.log("error fetching dashobord", error)

    res.status(500).json({message: "server error"})
  }
}

const getUserProfile = async (req, res) => {
  try {
    const profileId = req.params.userId
    const profileUser = await User.findById(profileId)

    if (!profileUser) {
      return res.status(404).json({message: "Profile not found"})
    }
    const userDesign = await DesignUpload.find({creator: profileId})
    let isOwner = false
    if (req.user) {
      const viewerId = req.user._id.toString()
      isOwner = viewerId === profileId
    }

    res.json({
      user: profileId,
      design: userDesign,
      isOwner: isOwner,
    })
  } catch (error) {
    console.log("error fetching dashobord", error)
    res.status(500).json({message: "server error"})
  }
}

module.exports = {
  UserInteraction,
  Check,
  Dashboard,
  SendProposal,
  getUserProfile,
}
