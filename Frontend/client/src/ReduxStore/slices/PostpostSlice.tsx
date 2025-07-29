import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

interface postPostArgs {
  formData: FormData
}
interface posptPostReturn {
  success: Boolean
}

interface postPost {
  buttonclick: Number
  file: File | null
  videoFile: File | null
  description: String
  type: String
  Title: String
  success: Boolean
  status: String
  postUpdateSuccess: Boolean
}

const initialState: postPost = {
  buttonclick: 1,
  file: null,
  videoFile: null,
  description: "",
  type: "div1",
  Title: "",
  success: false,
  postUpdateSuccess: false,
  status: "idle",
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
export const postPostFunction = createAsyncThunk<posptPostReturn, postPostArgs>(
  "postPost",
  async ({formData}) => {
    const res = await fetch(`${baseUrl}/auth/xyz`, {
      method: "POST",
      credentials: "include",
      body: formData,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    })
    const data = await res.json()
    console.log("postPost", data)
    return data
  }
)
export const postUpdateFunction = createAsyncThunk(
  "postupdate",
  async ({postId, formData}) => {
    const res = await fetch(`${baseUrl}/auth/update/${postId}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    })
    const data = await res.json()
    console.log("from slice postupdate", data)
    return data
  }
)

// export const postPostFunction2 = createAsyncThunk(
//   "postVideo",
//   async ({formData}) => {
//     const res = await fetch(`${baseUrl}/auth/UserVideoUpload`, {
//       method: "POST",
//       credentials: "include",
//       body: formData,
//       // headers:{
//       //   "Content-Type":"application/json"
//       // }
//     })
//     const data = await res.json()
//     console.log("videoPost", data)
//     return data
//   }
// )
// export const postPostFunction3 = createAsyncThunk(
//   "postBoth",
//   async ({formData}) => {
//     const res = await fetch(`${baseUrl}/auth/both`, {
//       method: "POST",
//       credentials: "include",
//       body: formData,
//       // headers:{
//       //   "Content-Type":"application/json"
//       // }
//     })
//     const data = await res.json()
//     console.log("videoPost", data)
//     return data
//   }
// )

export const postPost = createSlice({
  name: "postPost",
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload
    },
    setVideoFile: (state, action) => {
      state.videoFile = action.payload
    },
    setbuttonClick: (state, action) => {
      ;(state.buttonclick = action.payload.buttonclick),
        (state.type = action.payload.type)
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setTitle: (state, action) => {
      state.Title = action.payload
    },
    resetPostUpdateSuccess: state => {
      state.postUpdateSuccess = false
    },
  },
  extraReducers: builder => {
    builder.addCase(postPostFunction.fulfilled, (state, action) => {
      state.success = action.payload.success
      state.status = action.payload.status
    })
    builder.addCase(postUpdateFunction.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.postUpdateSuccess = true
      }
    })
    // builder.addCase(postPostFunction2.fulfilled, (state, action) => {
    //   state.success = action.payload.success
    // })
    // builder.addCase(postPostFunction3.fulfilled, (state, action) => {
    //   state.success = action.payload.success
    // })
  },
})

export const {setFile, setbuttonClick, setDescription, setTitle, setVideoFile} =
  postPost.actions
export const {resetPostUpdateSuccess} = postPost.actions

export const postPostReducer = postPost.reducer
