import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import { userData } from "./dataFetchSlice";
interface homecontent {
  UserProfileImage?: string;
  comments?: any[];
  createdAt?: string;
  creator?: userData;
  description?: string;
  images?: string[];
  likes?: any[];
  saves?: any[];
  tags?: any[];
  title?: string;
  _id?: string;
}

interface initialState {
  isPending: boolean;
  homeContent: homecontent[];
  isError: boolean;
  hasMorePost: boolean;
}

const initialState: initialState = {
  isPending: false,
  homeContent: [],
  isError: false,
  hasMorePost: true,
};

interface moreDetailInitialState {
  homeContent: homecontent[];
}
const moreDetailInitialState: moreDetailInitialState = {
  homeContent: [],
};

interface checkerInitialState {
  check: {
    follow: boolean;
    like: boolean;
    save: boolean;
  };
}
const checkerInitialState: checkerInitialState = {
  check: {
    follow: false,
    like: false,
    save: false,
  },
};

export const fetchHomeContent = createAsyncThunk(
  "FETCH_HOMECONTENT",
  async (page: number) => {
    console.log("heyyy", page);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(`http://localhost:5000/auth/Getdata?skip=${page}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const HomeContentSlice = createSlice({
  name: "homeContent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // When the fetchHomeContent action is pending (i.e., loading)
    builder.addCase(fetchHomeContent.pending, (state) => {
      state.isPending = true;
    });

    // When the fetchHomeContent action is fulfilled (i.e., data is fetched successfully)
    builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
      // Destructure data and hasMorePosts from the payload
      const { data = [], hasMorePost } = action.payload;

      // Add new posts to the homeContent array
      state.homeContent = [...state.homeContent, ...data];

      // Update hasMorePosts to determine whether to fetch more content
      state.hasMorePost = hasMorePost;

      // Set loading state to false
      state.isPending = false;
      state.isError = false;
    });

    // When the fetchHomeContent action is rejected (i.e., failed request)
    builder.addCase(fetchHomeContent.rejected, (state) => {
      state.isError = true;
      state.isPending = false;
    });
  },
});

export const fetchMoreDetail = createAsyncThunk(
  "FETCH_MORE_DETAILS",
  async (id: any) => {
    const res = await fetch(`http://localhost:5000/auth/getmore`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    return data;
  }
);

export const moreDetailSlice = createSlice({
  name: "moreDetail",
  initialState: moreDetailInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoreDetail.fulfilled, (state, action) => {
      state.homeContent = action.payload;
    });
  },
});

export const checkerFunction = createAsyncThunk(
  "checkerFunction",
  async (id: any) => {
    const res = await fetch("http://localhost:5000/auth/Check", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver: id }),
    });
    const data = await res.json();
    return data;
  }
);

export const Checker = createSlice({
  name: "checker",
  initialState: checkerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkerFunction.fulfilled, (state, action) => {
      state.check = action.payload;
    });
  },
});
export const homeContentReducer = HomeContentSlice.reducer;
export const moreDetailReducer = moreDetailSlice.reducer;
export const checkerReducer = Checker.reducer;
