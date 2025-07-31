import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

// Define interfaces for type safety
interface Member {
  _id: string
  username: string
  userImage: string // Added userImage to match component usage
}

interface Conversation {
  _id: string
  members: Member[]
}

interface Message {
  _id: string
  conversationId: string
  sender: Member
  text: string
  createdAt: string
}

interface LatestMessage {
  conversationIds: string
  latestMessages: {
    text: string
    createdAt: string
  }
  unreadCount: number
}

interface ChatState {
  conversationId: string
  send: boolean
  conversations: Conversation[]
  latestConversation: LatestMessage[]
  gotMessage: Message[]
  users: Conversation[]
  adminId: string
}

const initialState: ChatState = {
  conversationId: "",
  send: false,
  conversations: [],
  latestConversation: [],
  gotMessage: [],
  users: [],
  adminId: "",
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

// Async Thunks
export const getConversationId = createAsyncThunk(
  "message/getConversationId",
  async (receiverId: string | string[]) => {
    const res = await fetch(`${baseUrl}/auth/conversationid`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({receiverId}),
    })
    const data = await res.json()
    return data
  }
)

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({
    conversationid,
    message,
  }: {
    conversationid: string
    message: string | never[]
  }) => {
    const res = await fetch(`${baseUrl}/auth/chat/newMessage`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({conversationId: conversationid, text: message}),
    })
    const data = await res.json()
    return data
  }
)

export const getConversation = createAsyncThunk(
  "message/getConversation",
  async () => {
    const res = await fetch(`${baseUrl}/auth/dashboard/chat/conversations`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    return data
  }
)

export const getLatestMessage = createAsyncThunk(
  "message/getLatestMessage",
  async (conversationIds: string[]) => {
    const res = await fetch(`${baseUrl}/auth/dashboard/chat/latest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({conversationIds}),
    })
    const data = await res.json()
    return data
  }
)

export const getMessage = createAsyncThunk(
  "message/getMessage",
  async (conversationId: string) => {
    const res = await fetch(
      `${baseUrl}/auth/dashboard/chat/${conversationId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await res.json()
    return data
  }
)

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetSend: state => {
      state.send = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getConversationId.fulfilled, (state, action) => {
        state.conversationId = action.payload._id
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.send = action.payload.send
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.conversations = action.payload.Conversations || []
        state.adminId = action.payload.adminId || ""
      })
      .addCase(getLatestMessage.fulfilled, (state, action) => {
        state.latestConversation = action.payload || []
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.gotMessage = action.payload || []
      })
  },
})

export const MessageReducer = MessageSlice.reducer
export const {resetSend} = MessageSlice.actions
