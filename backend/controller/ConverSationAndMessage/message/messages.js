const Message = require("../../../models/Message")
//send message
const sendMessage = async (req, res) => {
  const {conversationId, text} = req.body
  console.log(conversationId, text, "bruhh message hit")
  const sender = req.user._id
  try {
    const message = new Message({
      conversationId,
      sender,
      text,
    })
    const save = await message.save()
    res.status(201).json({save, send: true})
  } catch (error) {
    res.status(500).json({error, send: false})
  }
}

//get messages
const getMessages = async (req, res) => {
  console.log("get message hit")
  const {conversationId} = req.params

  try {
    const message = await Message.find({conversationId})
      .populate("sender")
      .sort({createdAt: 1})
    res.status(200).json(message)
    console.log(message)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}

//getLatest Message
const getLatestMessage = async (req, res) => {
  console.log("Get message hit")
  const {conversationIds} = req.body
  if (!conversationIds || !Array.isArray(conversationIds)) {
    return res.status(400).json({error: "conversationIds must be an array"})
  }
  try {
    const latestMessages = await Promise.all(
      conversationIds.map(async id => {
        const latest = await Message.findOne({
          conversationId: id,
        })
          .sort({createdAt: -1})
          .limit(1)
        return {conversationIds: id, latestMessages: latest}
      })
    )
    res.status(200).json(latestMessages)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({})
    res.status(200).json({message: "All messages deleted"})
  } catch (err) {
    res.status(500).json({error: "Error deleting messages"})
  }
}
module.exports = {sendMessage, getMessages, getLatestMessage, deleteAllMessages}
