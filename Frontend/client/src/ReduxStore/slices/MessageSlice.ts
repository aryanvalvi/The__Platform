import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
  ConversationId: "",
  send: false,
  conversattions: [],
  latestConversation: [],
  gotMessage: [],
  Users: [
    {
      _id: "",
      members: [
        {
          username: "",
          _id: "",
        },
      ],
    },
  ],
  adminId: "",
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
export const getConversationId = createAsyncThunk(
  "GET_ID",
  async receiverId => {
    console.log("bro see reciver id", receiverId)
    const res = await fetch(`${baseUrl}/auth/conversationid`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({receiverId}),
    })
    const data = await res.json()
    console.log("lund ke bal", data)
    return data
  }
)

export const sendMessage = createAsyncThunk(
  "SEND_MESSAGE",
  async ({conversationid, message}) => {
    console.log("conversation id", conversationid, message)
    const res = await fetch(`${baseUrl}/auth/chat/newMessage`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({conversationId: conversationid, text: message}),
    })
    const data = await res.json()
    console.log("send data", data)
    return data
  }
)

export const getConversation = createAsyncThunk(
  "GET_CONVERSATIOn",
  async () => {
    const res = await fetch(`${baseUrl}/auth/dashboard/chat/conversations`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log("all chats ", data)
    return data
  }
)

export const getLatestMessage = createAsyncThunk(
  "GET_LATEST",
  async conversationids => {
    console.log("getlatest hit", conversationids)
    const res = await fetch(`${baseUrl}/auth/dashboard/chat/latest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({conversationIds: conversationids}),
    })
    const data = await res.json()
    console.log(data)
    return data
  }
)

export const getMessage = createAsyncThunk("GET_MESSAGE", async params => {
  const res = await fetch(`${baseUrl}/auth/dashboard/chat/${params}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()
  console.log("GOT THE FUCKING MESSAGE", data)
  return data
})

export const MessageSliceFunction = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    resetSend: state => {
      state.send = false
    },
  },
  extraReducers: builder => {
    builder.addCase(getConversationId.fulfilled, (state, action) => {
      state.ConversationId = action.payload._id
    })
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.send = action.payload.send
    })
    builder.addCase(getConversation.fulfilled, (state, action) => {
      state.conversattions = action.payload.Conversations
      state.adminId = action.payload.adminId
    })
    builder.addCase(getLatestMessage.fulfilled, (state, action) => {
      state.latestConversation = action.payload
    })
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.gotMessage = action.payload
    })
  },
})

export const MessageReducer = MessageSliceFunction.reducer
export const {resetSend} = MessageSliceFunction.actions
