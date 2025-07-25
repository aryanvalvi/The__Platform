import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
const initialState = {
  interaction: {
    followed: false,
    like: false,
    save: false,
  },
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
export const sendUserInteraction = createAsyncThunk(
  "sendUserinteraction",
  async ({actionType, postId}) => {
    const res = await fetch(`${baseUrl}/auth/userInteraction`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({actionType, postId}),
    })
    const data = await res.json()
    console.log(data)
    return data
  }
)
export const sendUserInteraction2 = createAsyncThunk(
  "sendUserinteraction",
  async ({actionType, id}) => {
    const res = await fetch(`${baseUrl}/auth/userInteraction2`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({actionType, id}),
    })
    const data = await res.json()
    console.log(data)
    return data
  }
)

export const CheckUserInteraction = createAsyncThunk(
  "CHECKER_INTERSACTION",
  async ({postid, actionType}) => {
    console.log(postid, actionType)
    const res = await fetch(`${baseUrl}/auth/Check/${postid}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({actionType}),
    })
    const data = await res.json()
    console.log(data)
    return data
  }
)

export const userInteractionSlice = createSlice({
  name: "userInteraction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendUserInteraction.fulfilled, (state, action) => {
      state.interaction = {
        ...state.interaction,
        ...action.payload,
      }
    })
    builder.addCase(CheckUserInteraction.fulfilled, (state, action) => {
      state.interaction = {
        ...state.interaction,
        ...action.payload,
      }
    })
  },
})

export const userInteractionReducer = userInteractionSlice.reducer
