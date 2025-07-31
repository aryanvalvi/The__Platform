import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

type LikedState = {
  interaction: {
    followed: boolean
    like: boolean
    save: boolean
  }
  liked: {
    [postId: string]: boolean
  }
  likingInProgress: boolean
}

const initialState: LikedState = {
  interaction: {
    followed: false,
    like: false,
    save: false,
  },
  liked: {},
  likingInProgress: false,
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export const sendUserInteraction = createAsyncThunk<
  {followed: boolean; like: boolean; save: boolean},
  {actionType: string; postId: string | any}
>("sendUserinteraction", async ({actionType, postId}) => {
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
})

interface SendInteractionArgs {
  actionType: string
  id: string
}

export const sendUserInteraction2 = createAsyncThunk<
  unknown,
  SendInteractionArgs
>("sendUserinteraction", async ({actionType, id}) => {
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
})

export const CheckUserInteraction = createAsyncThunk<
  {followed: boolean; like: boolean; save: boolean},
  {postid: string | any; actionType: string}
>("CHECKER_INTERACTION", async ({postid, actionType}) => {
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
})

export const CheckUserInteraction2 = createAsyncThunk<
  {[postId: string]: boolean},
  string[] | string | any
>("CHECKER2", async ids => {
  console.log(ids)
  const res = await fetch(`${baseUrl}/auth/check2`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ids}),
  })
  const data = await res.json()
  console.log(data)
  return data.liked
})

export const toggleLikePost = createAsyncThunk<
  {success: boolean; postId: string; isLiked: boolean},
  string
>("TOGGLE_LIKE", async postId => {
  console.log("Toggling like for post:", postId)
  const res = await fetch(`${baseUrl}/auth/toggle-like`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({postId}),
  })
  const data = await res.json()
  console.log("Toggle like response:", data)
  return data
})

export const userInteractionSlice = createSlice({
  name: "userInteraction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendUserInteraction.fulfilled, (state, action) => {
        if (action.payload) {
          state.interaction = {
            ...state.interaction,
            ...action.payload,
          }
        }
      })
      .addCase(CheckUserInteraction.fulfilled, (state, action) => {
        state.interaction = {
          ...state.interaction,
          ...action.payload,
        }
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Ensure the liked structure exists (optional, since initialState defines it)
          if (!state.liked) {
            state.liked = {}
          }
          // Update the liked status for the specific post
          state.liked[action.payload.postId] = action.payload.isLiked
        }
      })
      .addCase(CheckUserInteraction2.fulfilled, (state, action) => {
        state.liked = action.payload
      })
  },
})

export const userInteractionReducer = userInteractionSlice.reducer
