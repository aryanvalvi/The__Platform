import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
interface user {
  followers: string[]
  following: string[]
  googleID: string
  likedBY: string[]
  likedDesigns: string[]
  messages: any[]
  savedDesigns: string[]
  userImage: string
  username: string
  __v: number
  _id: string
}

interface InitialState {
  data: any[]
  Admin: boolean
  user: user
  totalDesign: number
  savedDesigns: any[]
  OtherProfile: {}
}
const initialState: InitialState = {
  data: [],
  user: {
    followers: [],
    following: [],
    googleID: "",
    likedBY: [],
    likedDesigns: [],
    messages: [],
    savedDesigns: [],
    userImage: "",
    username: "",
    __v: 0,
    _id: "",
  },
  totalDesign: 0,
  Admin: false,

  savedDesigns: [],
  OtherProfile: {
    design: [],
    user: {},
    totalDesign: 0,
  },
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
export const UserProfileSliceFunction = createAsyncThunk(
  "userprofile",
  async id => {
    const res = await fetch(`${baseUrl}/auth/getprofile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })
    const data = await res.json()
    console.log(id)
    console.log("User profile", data)
    return data
  }
)

export const UserDashBoardFunction = createAsyncThunk(
  "userDashboard",
  async id => {
    const res = await fetch(`${baseUrl}/auth/dashboard`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })
    const data = await res.json()
    console.log("from userprofile slice ", data)
    return data
  }
)
export const OtherProfile = createAsyncThunk("otherDashboard", async id => {
  const res = await fetch(`${baseUrl}/auth/profile/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()
  console.log("from userprofile slice ", data)
  return data
})

export const UserSavedDesigns = createAsyncThunk(
  "USER_SAVED_DESIGNS",
  async ({actionType, postId}) => {
    console.log(actionType, postId)
    const res = await fetch(`${baseUrl}/auth/savedDesigns`, {
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

export const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(UserProfileSliceFunction.fulfilled, (state, action) => {
      ;(state.Admin = action.payload.Admin),
        (state.IdMatched = action.payload.IdMatched),
        (state.data = action.payload.data)
    })
    builder.addCase(UserDashBoardFunction.fulfilled, (state, action) => {
      ;(state.Admin = action.payload.isOwner),
        (state.data = action.payload.design),
        (state.user = action.payload.user)
      state.totalDesign = action.payload.totalDesign
    })
    builder.addCase(UserSavedDesigns.fulfilled, (state, action) => {
      state.savedDesigns = action.payload
    })
    builder.addCase(OtherProfile.fulfilled, (state, action) => {
      state.OtherProfile = action.payload
    })
  },
})

export const UserProfileSliceReducer = UserProfileSlice.reducer
