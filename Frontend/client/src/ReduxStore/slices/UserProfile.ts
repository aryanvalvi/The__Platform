import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// Type declare kiya
export type User = {
  _id: string
  username: string
  userImage: string
  googleID: string
  followers: string[]
  following: string[]
  likedBY: string[]
  likedDesigns: string[]
  savedDesigns: string[]
  messages: any[]
  __v: number
}

export type DesignPost = {
  _id: string
  title: string
  description: string
  creator: string
  UserProfileImage: string
  comments: any[]
  createdAt: string
  downloads: number
  externalLinks: string[]
  images: string[]
  likes: string[]
  saves: string[]
  sideImages: string[]
  tags: string[]
  tools: string[]
  video: string
  views: number
  visibility: "public" | "private"
  __v: number
  isOwner: boolean
  totalDesign: number
  // user: User
}

export interface DashboardState {
  Admin: boolean
  data: DesignPost[] | null
  user: User | null
  totalDesign: number
  savedDesigns: DesignPost[] | null
  OtherProfile: {
    design: DesignPost[] | null
    totalDesign: number
    user: User | null
  }
}

const initialState: DashboardState = {
  Admin: false,
  data: null,
  user: null,
  totalDesign: 0,
  savedDesigns: null,
  OtherProfile: {
    design: null,
    totalDesign: 0,
    user: null,
  },
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
// export const UserProfileSliceFunction = createAsyncThunk(
//   "userprofile",
//   async id => {
//     const res = await fetch(`${baseUrl}/auth/getprofile`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({id}),
//     })
//     const data = await res.json()
//     console.log(id)
//     console.log("User profile", data)
//     return data
//   }
// )

export const UserDashBoardFunction = createAsyncThunk(
  "userDashboard",
  async (id: string | string[]) => {
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
export const OtherProfile = createAsyncThunk(
  "otherDashboard",
  async (id: string | string[] | undefined) => {
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
  }
)

export const UserSavedDesigns = createAsyncThunk(
  "USER_SAVED_DESIGNS",
  async ({actionType, postId}: {actionType: string; postId: string}) => {
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
    // builder.addCase(UserProfileSliceFunction.fulfilled, (state, action) => {
    //   state.Admin = action.payload.Admin
    //   state.IdMatched = action.payload.IdMatched
    //   state.data = action.payload.data
    // })
    builder.addCase(UserDashBoardFunction.fulfilled, (state, action) => {
      state.Admin = action.payload.isOwner
      state.data = action.payload.design
      state.user = action.payload.user
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
