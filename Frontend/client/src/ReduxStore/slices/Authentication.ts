import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
  user: null,
  loading: true,
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
export const authCheckFunction = createAsyncThunk(
  "authcheckFunction",
  async (_, {rejectWithValue}) => {
    try {
      const res = await fetch(`${baseUrl}/auth/status`, {
        method: "GET",
        credentials: "include",
      })

      if (!res.ok) {
        console.log("chutiya un authorized he")
        throw new Error("unauthorized")
      }
      const data = await res.json()
      console.log(data)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authCheckFunction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(authCheckFunction.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user || null
    })
    builder.addCase(authCheckFunction.rejected, (state, action) => {
      state.loading = false
      state.user = null
    })
  },
})

export const AuthenticationReducer = authSlice.reducer
