const User = require("../models/UserSchema")
const DesignUpload = require("../models/DesignSchema")
const {UserData} = require("../models/user-model")

// const UserInteraction = async (req, res) => {
//   const {action, post} = req.body
//   const userId = req.user._id
//   console.log("postId", post)
//   const design = await DesignUpload.findById(post)
//   console.log("design", design)
//   switch (action) {
//     case "follow":
//       console.log(action, post, userId)

//       const admin = await User.findById(post)
//       const isFollowing = admin.followers.includes(userId)
//       if (isFollowing) {
//         //unfollow

//         await User.findByIdAndUpdate(post, {
//           $pull: {followers: userId},
//         })
//         await User.findOneAndUpdate(userId, {
//           $pull: {
//             following: post,
//           },
//         })
//         res.json({follow: false})
//       } else {
//         //follow

//         await User.findOneAndUpdate(post, {
//           $addToSet: {
//             followers: userId,
//           },
//         })
//         await User.findByIdAndUpdate(userId, {
//           $addToSet: {following: post},
//         })

//         res.json({follow: true})
//       }

//       break

//     case "like":
//       console.log(action, post, userId)

//       console.log("postId", post)
//       if (design.likes.includes(userId)) {
//         design.likes = design.likes.filter(
//           id => id.toString() !== userId.toString()
//         )
//         await design.save()
//         return res.status(200).json({like: false})
//       } else {
//         design.likes.push(userId)
//         await design.save()
//         return res.status(200).json({like: true})
//       }
//       break
//     case "save":
//       console.log("saveeeee", action, post, userId)
//       const user = await User.findById(userId)
//       const isSaved = user.savedDesigns.includes(post)

//       if (isSaved) {
//         // Unsave
//         await User.findByIdAndUpdate(userId, {
//           $pull: {savedDesigns: post},
//         })
//         res.json({save: false})
//       } else {
//         // Save
//         await User.findByIdAndUpdate(userId, {
//           $addToSet: {savedDesigns: post},
//         })
//         res.json({save: true})
//       }
//       break
//   }
// }

const UserInteraction = async (req, res) => {
  const {actionType, postId} = req.body
  // const adminId = req.user._id
  const adminId = req.user._id

  try {
    // first we are getting the information about the post and who posted that post
    const creatorOfPost = await DesignUpload.findById(postId).populate(
      "creator"
    )
    const creator = await User.findById(creatorOfPost.creator._id)
    const Admin = await User.findById(adminId)
    switch (actionType) {
      case "follow":
        const isFollowing = creator.followers.includes(adminId)

        if (isFollowing) {
          creator.followers = creator.followers.filter(
            id => id.toString() !== adminId.toString()
          )
          Admin.following = Admin.following.filter(
            id => id.toString() !== creator._id.toString()
          )
        } else {
          creator.followers.push(adminId)
          Admin.following.push(creator._id)
        }
        await creator.save()
        await Admin.save()
        res.status(200).json({
          // creator,
          // Admin,
          Message: isFollowing ? "Unfollowed" : "Followed",
          followed: !isFollowing,
        })
        break

      case "like":
        const design = await DesignUpload.findById(postId)

        if (!design) {
          return res.status(404).json({message: "Design not found"})
        }

        const alreadyLiked = design.likes.includes(adminId)

        if (alreadyLiked) {
          // Unlike
          design.likes = design.likes.filter(
            id => id.toString() !== adminId.toString()
          )
          await design.save()
          return res.status(200).json({
            message: "Unliked",
            // likes: design.likes,
            like: false,
          })
        } else {
          // Like
          design.likes.push(adminId)
          await design.save()
          return res.status(200).json({
            message: "Liked",
            //  likes: design.likes,
            like: true,
          })
        }

        break

      case "save":
        const alreadySaved = Admin.savedDesigns.includes(postId)
        if (alreadySaved) {
          Admin.savedDesigns = Admin.savedDesigns.filter(
            id => id.toString() !== postId.toString()
          )
          await Admin.save()
          res.status(200).json({message: "Post Unsaved", save: false})
        } else {
          Admin.savedDesigns.push(postId)
          await Admin.save()
          res.status(200).json({message: "Post saved", save: true})
        }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const UserInteraction2 = async (req, res) => {
  const {actionType, id} = req.body
  console.log(actionType, id)
  const adminId = req.user._id
  try {
    const Admin = await User.findById(adminId)
    const otherUser = await User.findById(id)
    switch (actionType) {
      case "followFromOther":
        console.log("followFromOther called")
        const isFollowing2 = otherUser.followers.includes(adminId)

        if (isFollowing2) {
          otherUser.followers = otherUser.followers.filter(
            id => id.toString() !== adminId.toString()
          )
          Admin.following = Admin.following.filter(
            id => id.toString() !== otherUser._id.toString()
          )
        } else {
          otherUser.followers.push(adminId)
          Admin.following.push(otherUser._id)
        }
        await otherUser.save()
        await Admin.save()
        res.status(200).json({
          followed: !isFollowing2,
        })

        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const Check = async (req, res) => {
  const {postId} = req.params

  const adminId = req.user?._id
  const {actionType} = req.body
  try {
    if (actionType === "fromOther") {
      console.log("fromOther called")
      const Admin = await User.findById(adminId)
      const creator = await User.findById(postId)
      // const hasLiked = post.likes.includes(adminId)
      const isFollowing = creator.followers.includes(adminId)
      const isSaved = Admin.savedDesigns.includes(postId)

      return res.status(200).json({
        // like: hasLiked,
        followed: isFollowing,
        save: isSaved,
      })
    }
    if (actionType === "fromDetail") {
      console.log("fromDetail called")
      const post = await DesignUpload.findById(postId).populate("creator")
      if (!post) return res.status(404).json({message: "Post not found"})

      const creator = await User.findById(post.creator._id)
      const Admin = await User.findById(adminId)

      const hasLiked = post.likes.includes(adminId)
      const isFollowing = creator.followers.includes(adminId)
      const isSaved = Admin.savedDesigns.includes(postId)

      return res.status(200).json({
        like: hasLiked,
        followed: isFollowing,
        save: isSaved,
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Server error", error: err})
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

const OtherProfile = async (req, res) => {
  const {id} = req.params
  console.log("helelo", id)
  try {
    const userDesign = await DesignUpload.find({creator: id})
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({message: "User not found"})
    }
    res.json({
      design: userDesign,
      user: user,
      totalDesign: userDesign.length,
    })
  } catch (error) {
    res.status(500).json({message: "server error"})
    console.log(error)
  }
}

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
      totalDesign: userDesign.length,
    })
  } catch (error) {
    console.log("error fetching dashobord", error)

    res.status(500).json({message: "server error"})
  }
}

const HandleSavedDesigns = async (req, res) => {
  const userid = req.user._id
  const Admin = await User.findById(userid)
  const {actionType, postId} = req.body

  try {
    if (actionType === "fetch") {
      const DesignsIds = Admin.savedDesigns
      const designs = await DesignUpload.find({_id: {$in: DesignsIds}})
      res.status(200).json(designs)
    }
    if (actionType == "edit") {
      Admin.savedDesigns = Admin.savedDesigns.filter(
        id => id.toString() !== postId.toString()
      )
      await Admin.save()

      const updatedDesigns = await DesignUpload.find({
        _id: {$in: Admin.savedDesigns},
      })
      res.status(200).json(updatedDesigns)
    }
  } catch (error) {
    res.status(500).json(error)
  }

  // const userId = req.user._id
  // const {action, editDesignId} = req.body
  // const user = await User.findById(userId)

  // try {
  //   if (action === "fetch") {
  //     const savedDesigns = await DesignUpload.find({
  //       _id: {$in: user.savedDesigns},
  //     })
  //     res.status(200).json(savedDesigns)
  //   }
  //   if (action === "edit") {
  //     user.savedDesigns = user.savedDesigns.filter(
  //       id => id.toString() == editDesignId.toString()
  //     )
  //     await user.save()
  //     const updatedDesingid = await User.findById(userId).populate(
  //       "savedDesigns"
  //     )
  //     res.status(200).json({updatedDesingid, bro: "ho gaya"})
  //   }
  // } catch (error) {
  //   res.status(500).json(error)
  // }
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
  HandleSavedDesigns,
  OtherProfile,
  UserInteraction2,
}
