const mongoose = require("mongoose")
const Conversation = require("../../../models/Conversation")

//New Conversation
const newConversation = async (req, res) => {
  const {receiverId} = req.body
  const senderId = req.user._id
  console.log("bkl", receiverId, senderId)
  try {
    const senderObjectId = new mongoose.Types.ObjectId(senderId)
    const receiveObjectId = new mongoose.Types.ObjectId(receiverId)
    const existing = await Conversation.findOne({
      members: {$all: [senderObjectId, receiveObjectId]},
    })

    if (existing) {
      res.status(200).json(existing)
    } else {
      const newConversation = new Conversation({
        members: [senderObjectId, receiveObjectId],
      })

      const saveConversation = await newConversation.save()
      res.status(200).json(saveConversation)
    }
  } catch (error) {
    console.log(error)
  }
}

// get Conversation

const getConversations = async (req, res) => {
  const adminId = req.user._id
  console.log("adminId", adminId)
  try {
    const Conversations = await Conversation.find({
      members: {$in: [adminId]},
    }).populate("members", "_id username userImage ")
    // }).populate("members")

    res.status(200).json({Conversations, adminId})
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {newConversation, getConversations}
