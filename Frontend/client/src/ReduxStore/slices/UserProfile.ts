import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface admin {
  followers: string[];
  following: string[];
  googleID: string;
  likedBY: string[];
  likedDesigns: string[];
  messages: any[];
  savedDesigns: string[];
  userImage: string;
  username: string;
  __v: number;
  _id: string;
  
}

interface InitialState  {
data :any[];
 Admin:admin;

IdMatched:Boolean,

};
const initialState :InitialState={
  data:[],
  Admin:{
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

IdMatched:false
}



export const UserProfileSliceFunction = createAsyncThunk(
  "userprofile",
  async(id)=>{
    const res = await fetch("http://localhost:5001/auth/dashboard",{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    })
    const data = await res.json();
    console.log(id)
    console.log("User profile",data)
    return data;
  }
)


export const UserProfileSlice = createSlice({
name:"userProfile",
initialState,
reducers:{

},
extraReducers:(builder)=>{
  builder.addCase(UserProfileSliceFunction.fulfilled,(state,action)=>{
    state.Admin = action.payload.Admin,
    state.IdMatched = action.payload.IdMatched,
  state.data = action.payload.data
  })



}}
) 

export const UserProfileSliceReducer = UserProfileSlice.reducer;