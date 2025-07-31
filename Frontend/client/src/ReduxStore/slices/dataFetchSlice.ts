import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export interface MessageType {
  _id: string
  message: string
  budget: number
  senderId: string
}

export interface UserData {
  _id: string
  googleID?: string
  username: string
  userImage: string
  following?: string[]
  followers?: string[]
  likedBy?: string[]
  likedDesigns?: string[]
  messages?: MessageType[]
  saveDesigns?: string[]
  user: boolean
  __v?: number
}

interface UserDataState {
  userData: UserData | null
  pending: boolean
  isError: boolean
}

const initialState: UserDataState = {
  userData: null,
  pending: false,
  isError: false,
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

export const fetchUserData = createAsyncThunk<
  {user: UserData} | {user: false},
  void,
  {rejectValue: string}
>("FETCH_DATA", async (_, {rejectWithValue}) => {
  try {
    const res = await fetch(`${baseUrl}/auth/getuserdata`, {
      method: "GET",
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    console.log("data is ", data.user)
    return data
  } catch (error) {
    console.error("Failed to fetch user data:", error)
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    )
  }
})

export const dataFetching = createSlice({
  name: "dataFetching",
  initialState,
  reducers: {
    logoutUser(state) {
      console.log("Logging out user")
      state.userData = null
      state.pending = false
      state.isError = false
    },
    clearError(state) {
      state.isError = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.pending = true
        state.isError = false
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.pending = false
        state.isError = false

        if (action.payload.user === false) {
          state.userData = null
        } else {
          state.userData = action.payload.user as UserData
        }
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.pending = false
        state.isError = true
        state.userData = null
        console.error("Fetch user data rejected:", action.payload)
      })
  },
})

export const {logoutUser, clearError} = dataFetching.actions
export default dataFetching.reducer
