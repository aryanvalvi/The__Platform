import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export interface userData {
  user: boolean
  followers?: []
  following?: []
  googleId?: string
  likedBy?: []
  likedDesigns?: []
  saveDesigns?: []
  userImage?: string
  username?: string
  _id?: string
}

interface userDataType {
  userData: userData
  pending: boolean
  isError: boolean
}

const initialState: userDataType = {
  userData: {
    user: false,
    followers: [],
    following: [],
    likedBy: [],
    likedDesigns: [],
    saveDesigns: [],
    userImage: "",
    username: "",
    _id: "",
  },
  pending: false,
  isError: false,
}
const baseUrl = process.env.NEXT_API_URL || "http://localhost:5001"
export const fetchUserData = createAsyncThunk<userData>(
  "FETCH_DATA",
  async () => {
    const res = await fetch(`${baseUrl}/auth/getuserdata`, {
      method: "GET",
      credentials: "include",
    })
    // const res = await axios.get(`http://localhost:5000/auth/getuserdata`, {
    //   withCredentials:true,
    // })
    //   console.log(res.data)
    //   const Data = res.data;
    //   return Data;

    const data = await res.json()
    console.log("data is ", data.user)
    return data
  }
)

export const dataFetching = createSlice({
  name: "dataFetching",
  initialState,
  reducers: {
    logoutUser(state) {
      console.log("oye ")
      state.userData = {
        user: false,
        followers: [],
        following: [],
        likedBy: [],
        likedDesigns: [],
        saveDesigns: [],
        userImage: "",
        username: "",
        _id: "",
      }
    },
  },
  extraReducers: builder => {
    //pendingState
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.pending = true
    })

    //fullfill
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload
    })

    //error state
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isError = true
    })
  },
})

export const {logoutUser} = dataFetching.actions
export default dataFetching.reducer
