const mongoose = require("mongoose")
const Conversation = require("../../../models/Conversation")

//New Conversation
const newConversation = async (req, res) => {
  const {senderId, receiverId} = req.body
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

//get Conversation

module.exports = {newConversation}
