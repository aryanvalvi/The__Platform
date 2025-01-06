import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface userData {
  followers?: [];
  following?: [];
  googleId?: string;
  likedBy?: [];
  likedDesigns?: [];
  saveDesigns?: [];
  userImage?: string;
  username?: string;
  _id?: string;
}

interface userDataType {
  userData: userData;
  pending: boolean;
  isError: boolean;
}

const initialState: userDataType = {
  userData: {
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
};

export const fetchUserData = createAsyncThunk<userData>(
  "FETCH_DATA",
  async () => {
    const res = await fetch(`http://localhost:5000/auth/getuserdata`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  }
);

export const dataFetching = createSlice({
  name: "dataFetching",
  initialState,
  reducers: {
    getData(state, action) {},
  },
  extraReducers: (builder) => {
    //pendingState
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.pending = true;
    });

    //fullfill
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    //error state
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default dataFetching.reducer;
