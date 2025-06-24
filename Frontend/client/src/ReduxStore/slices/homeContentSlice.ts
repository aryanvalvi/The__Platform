import {createSlice, createAsyncThunk, isPending} from "@reduxjs/toolkit"
import {userData} from "./dataFetchSlice"
interface homecontent {
  UserProfileImage?: string
  comments?: any[]
  createdAt?: string
  creator?: userData
  description?: string
  images?: string[]
  likes?: any[]
  saves?: any[]
  tags?: any[]
  title?: string
  _id?: string
}

interface initialState {
  loading: boolean
  currentPage: number
  homeContent: homecontent[]
  hasMorePost: boolean
  isError: boolean
  totalPost: Number
  page: number
  skip: number
  prevData: homecontent[]
}

const initialState: initialState = {
  loading: false,
  currentPage: 1,
  homeContent: [],
  hasMorePost: true,
  isError: false,
  totalPost: 0,
  page: 1,
  skip: 0,
  prevData: [],
}

interface moreDetailInitialState {
  homeContent: homecontent[]
}
const moreDetailInitialState: moreDetailInitialState = {
  homeContent: [],
}

interface checkerInitialState {
  check: {
    follow: boolean
    like: boolean
    save: boolean
  }
}
const checkerInitialState: checkerInitialState = {
  check: {
    follow: false,
    like: false,
    save: false,
  },
}

const userPostInteractionState: checkerInitialState = {
  check: {
    follow: false,
    like: false,
    save: false,
  },
}
interface Proposal {
  post: string
  message: string
  budget: number
}
interface sendproposalState {
  proposal: Proposal[]
}
const sendproposalState: sendproposalState = {
  proposal: [],
}

const baseUrl = process.env.NEXT_API_URL || "http://localhost:5001"
export const fetchHomeContent = createAsyncThunk(
  "homeContent/fetchHomeContent",
  async page => {
    // console.log("From FetchHomeContent asyc thunk")
    // const state:any = getState();
    // const page = state.homeContent.page;
    console.log("pageNumber", page)

    const res = await fetch(
      `http://144.91.104.106:5001/auth/Getdata?page=${page}`,
      {
        // const res = await fetch(
        //   `https://the-platform-backend-9a4a.onrender.com/auth/Getdata?page=${page}`,
        //   {
        method: "GET",
        credentials: "include",
      }
    )
    const {data, totalPost} = await res.json()
    console.log("HomeContentSlie", data)
    return {data, totalPost}
  }
)

export const homeContentSlice = createSlice({
  name: "homeContent",
  initialState,
  reducers: {
    setPageIncrease: state => {
      state.page += 1
      console.log("Page value from reducer", state.page)
    },
  },
  extraReducers: builder => {
    // When the fetchHomeContent action is pending (i.e., loading)
    builder.addCase(fetchHomeContent.pending, state => {
      state.loading = true
    })

    // When the fetchHomeContent action is fulfilled (i.e., data is fetched successfully)
    builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
      const {data, totalPost} = action.payload
      const prevData = state.prevData
      if (JSON.stringify(data) === JSON.stringify(prevData)) {
        console.log(
          "Page data is the same as previous page data. Skipping fetch."
        )
        state.page += 1
        // state.hasMorePost = false; // No more data to fetch
        return
      }
      // const validData = Array.isArray(data)?data:[]
      // if (Array.isArray(data)){

      state.homeContent = [...state.homeContent, ...data]
      // }
      state.prevData = data
      state.totalPost = totalPost
      state.hasMorePost = state.homeContent.length < totalPost

      // Increment current page for next request
    })

    // When the fetchHomeContent action is rejected (i.e., failed request)
    builder.addCase(fetchHomeContent.rejected, state => {
      state.isError = true
      state.loading = false
    })
  },
})

export const fetchMoreDetail = createAsyncThunk(
  "FETCH_MORE_DETAILS",
  async (id: any) => {
    const res = await fetch(`${baseUrl}/auth/getmore`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })
    const data = await res.json()
    console.log("get more", data)
    return data
  }
)

export const moreDetailSlice = createSlice({
  name: "moreDetail",
  initialState: moreDetailInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMoreDetail.fulfilled, (state, action) => {
      state.homeContent = action.payload
    })
  },
})

export const checkerFunction = createAsyncThunk(
  "checkerFunction",
  async (id: any) => {
    const res = await fetch(`${baseUrl}/auth/Check`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({receiver: id}),
    })
    const data = await res.json()
    return data
  }
)

export const Checker = createSlice({
  name: "checker",
  initialState: checkerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkerFunction.fulfilled, (state, action) => {
      state.check = action.payload
    })
  },
})
export const userPostInteractionFunction = createAsyncThunk(
  "userPostInteraction",
  async ({action, post}: {action: string; recieverId: string}) => {
    const userdata = {
      action,
      post,
    }
    console.log("action receiverId", userdata)
    const res = await fetch(`${baseUrl}/auth/userInteraction`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
    const data = await res.json()
    console.log("afterchecker ", data)
    return data
  }
)

export const userPostInteraction = createSlice({
  name: "interaction",
  initialState: userPostInteractionState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userPostInteractionFunction.fulfilled, (state, action) => {
      state.check = action.payload
    })
  },
})
export const SendproposalFunction = createAsyncThunk(
  "Sendproposal",
  async ({message, post, budget}) => {
    const res = await fetch(`${baseUrl}/sendproposal`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message, post, budget}),
    })
    const data = await res.json()
    console.log("proposeeeee", data)
    return data
  }
)
export const Sendproposal = createSlice({
  name: "sendproposal",
  initialState: sendproposalState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(SendproposalFunction.fulfilled, (state, action) => {
      state.proposal = action.payload
    })
  },
})

export const {setPageIncrease, setPageFromStorage} = homeContentSlice.actions
export const SendproposalReducer = Sendproposal.reducer
export const homeContentReducer = homeContentSlice.reducer
export const moreDetailReducer = moreDetailSlice.reducer
export const checkerReducer = Checker.reducer
export const userPostInteractionReducer = userPostInteraction.reducer
