"use client"
import React, {useEffect, useState} from "react"
import "./chat.scss"

import {
  getConversation,
  getLatestMessage,
  getMessage,
  resetSend,
  sendMessage,
} from "@/ReduxStore/slices/MessageSlice"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState({
    image: "",
    name: "",
    selectedUserId: "",
    conversationId: "",
  })
  const [messages, setMessages] = useState<string>("")
  const data = useAppSelector(state => state.MessageReducer.conversations)
  const admin = useAppSelector(state => state.MessageReducer.adminId)
  const latestMessages = useAppSelector(
    state => state.MessageReducer.latestConversation
  )
  const dispatch = useAppDispatch()
  const gotMessage = useAppSelector(state => state.MessageReducer.gotMessage)
  // const conversationId = useAppSelector(
  //   state => state.MessageReducer.ConversationId
  // )
  const sendOk = useAppSelector(state => state.MessageReducer.send)
  console.log(gotMessage)
  // console.log("conversation id is", conversationId)
  // console.log("sendok", sendOk)
  const filterData = data
    .map(e => {
      const otherUser = e.members.find(member => member._id !== admin)
      const latestMsg = latestMessages.find(
        msg => msg.conversationIds === e._id
      )
      return {conversationId: e._id, otherUser, latestMsg}
    })
    .filter(item => item.otherUser !== undefined) // Filter out undefined otherUser
    .map(item => ({
      ...item,
      otherUser: item.otherUser!, // Now we can safely assert it's not undefined
    }))

  const selectUserFunction = (e: {
    conversationId: string
    otherUser: {_id: string; username: string; userImage: string}
    latestMsg?: {
      conversationIds: string
      latestMessages: {text: string; createdAt: string}
      unreadCount: number
    }
  }) => {
    console.log(e)
    dispatch(getMessage(e.conversationId))
    console.log(e)
    console.log(e.conversationId)
    setSelectedUser({
      image: e.otherUser.userImage,
      name: e.otherUser.username,
      selectedUserId: e.otherUser._id,
      conversationId: e.conversationId,
    })
  }
  const sendMessageNow = () => {
    dispatch(resetSend())
    dispatch(
      sendMessage({
        conversationid: selectedUser.conversationId,
        message: messages,
      })
    )
    setMessages("")
  }

  useEffect(() => {
    dispatch(getMessage(selectedUser.conversationId))
  }, [sendOk, dispatch, selectedUser.conversationId])

  useEffect(() => {
    dispatch(getConversation())
  }, [dispatch])

  useEffect(() => {
    if (data && data.length > 0) {
      const conversationsIds = data.map(e => e._id)
      dispatch(getLatestMessage(conversationsIds))
    }
  }, [data, dispatch])

  return (
    <div className="ChatMainContainer">
      <div className="leftChat">
        <div className="topchatpart">
          <p>Messages</p>
        </div>
        <div className="middleSearchChartPart">
          <input type="text" placeholder="Search Message" />
        </div>
        <div className="lastChatPart">
          {filterData.map(e => (
            <div
              onClick={() => selectUserFunction(e)}
              className="user-details"
              key={e.conversationId}
            >
              <div className="avatar">
                <img src={e.otherUser?.userImage} alt={e.otherUser?.username} />
              </div>
              <div className="nameMsg">
                <div className="user-name">
                  <p>{e.otherUser?.username}</p>
                  {/* {e.latestMsg?.unreadCount > 0 && (
                    <span className="unread-badge">
                      {e.latestMsg.unreadCount}
                    </span>
                  )} */}
                </div>
                <div className="latestMsg">
                  <p>
                    {e.latestMsg?.latestMessages?.text || "No messages yet"}
                  </p>
                </div>
              </div>
              <div className="timestamp">
                {/* <p>{e.latestMsg?.createdAt || "10:45"}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightChat">
        <div className="righChatTop">
          <div className="leftRightChartTop">
            <div className="rightSmallImg">
              <img src={selectedUser.image} alt="" />
            </div>

            <p>{selectedUser.name}</p>
          </div>
          <div className="rightRightChatTop">
            <button className="view-profile-btn ">View Profile</button>
          </div>
        </div>
        <div className="rightMiddleChatPart">
          {gotMessage.map(msg => {
            return (
              <div
                key={"bruh"}
                className={
                  msg.sender._id === admin ? "message admin" : "message other"
                }
              >
                <div className="message-info">
                  <img src={msg.sender.userImage} alt={msg.sender.username} />
                  {/* <span>{msg.sender.username}</span> */}
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            )
          })}
        </div>
        <div className="LastChatPart">
          <input
            value={messages}
            onChange={e => setMessages(e.target.value)}
            type="text"
          />
          <button onClick={sendMessageNow} type="submit">
            send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
