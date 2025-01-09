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
  loading: boolean;
  currentPage: number;
  homeContent: homecontent[];
  hasMorePost: boolean;
  isError: boolean;
}

const initialState: initialState = {
  loading: false,
  currentPage: 1,
  homeContent: [],
  hasMorePost: true,
  isError: false,
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


const userPostInteractionState :checkerInitialState = {
  check: {
    follow: false,
    like: false,
    save: false,
  },
}

export const fetchHomeContent = createAsyncThunk(
  "homeContent/fetchHomeContent",
  async (page: number) => {
    const res = await fetch(`http://localhost:5001/auth/Getdata?skip=${page}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  }
);

// const homeContentSlice = createSlice({
//   name: "homeContent",
//   initialState,
//   reducers: {
//     reset(state) {
//       state.loading = false;
//       state.currentPage = 1;
//       state.homeContent = [];
//       state.hasMorePost = true;
//       state.isError = false;
//     },
//   },
//   extraReducers: (builder) => {
//     // When the fetchHomeContent action is pending (i.e., loading)
//     builder.addCase(fetchHomeContent.pending, (state) => {
//       state.loading = true;
//     });

//     // When the fetchHomeContent action is fulfilled (i.e., data is fetched successfully)
//     builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
//       state.homeContent = [...state.homeContent, ...action.payload.data];
//       state.hasMorePost = action.payload.hasMorePost;
//       state.loading = false;
//       state.isError = false;
//       state.currentPage += 1; // Increment current page for next request
//     });

//     // When the fetchHomeContent action is rejected (i.e., failed request)
//     builder.addCase(fetchHomeContent.rejected, (state) => {
//       state.isError = true;
//       state.loading = false;
//     });
//   },
// });
export const homeContentSlice = createSlice({
  name: "homeContent",
  initialState,
  reducers: {
    reset(state) {
      state.loading = false;
      state.currentPage = 1;
      state.homeContent = [];
      state.hasMorePost = true;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    // When the fetchHomeContent action is pending (i.e., loading)
    builder.addCase(fetchHomeContent.pending, (state) => {
      state.loading = true;
    });

    // When the fetchHomeContent action is fulfilled (i.e., data is fetched successfully)
    builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
      state.homeContent = [...state.homeContent, ...action.payload.data];
      state.hasMorePost = action.payload.hasMorePost;
      state.loading = false;
      state.isError = false;
      state.currentPage += 1; // Increment current page for next request
    });

    // When the fetchHomeContent action is rejected (i.e., failed request)
    builder.addCase(fetchHomeContent.rejected, (state) => {
      state.isError = true;
      state.loading = false;
    });
  },
});

export const fetchMoreDetail = createAsyncThunk(
  "FETCH_MORE_DETAILS",
  async (id: any) => {
    const res = await fetch(`http://localhost:5001/auth/getmore`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    console.log("get more",data)
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
    const res = await fetch("http://localhost:5001/auth/Check", {
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
export const userPostInteractionFunction = createAsyncThunk(
  "userPostInteraction",
  async ({action,recieverId }:{ action:string;
    recieverId :string})=>{
  
      const userdata = {
        action,
        recieverId
  }
  console.log("action receiverId", userdata);
  const res = await fetch("http://localhost:5001/auth/userInteraction",{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(userdata)
    
  })
const data = await res.json();
console.log("afterchecker ",data) 
return data;
  }
)

export const userPostInteraction  = createSlice({
  name:"interaction",
  initialState:userPostInteractionState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(userPostInteractionFunction.fulfilled,(state,action)=>{
      state.check = action.payload;
    })

  }
})
export const homeContentReducer = homeContentSlice.reducer;
export const moreDetailReducer = moreDetailSlice.reducer;
export const checkerReducer = Checker.reducer;
export const userPostInteractionReducer = userPostInteraction.reducer;