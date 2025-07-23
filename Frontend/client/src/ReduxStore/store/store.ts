import {configureStore} from "@reduxjs/toolkit"
import UserDataFetchReducer from "../slices/dataFetchSlice"
import {
  homeContentReducer,
  SendproposalReducer,
  userPostInteractionReducer,
} from "../slices/homeContentSlice"
import {moreDetailReducer} from "../slices/homeContentSlice"
import {checkerReducer} from "../slices/homeContentSlice"
import {postPostReducer} from "../slices/PostpostSlice"
import {UserProfileSliceReducer} from "../slices/UserProfile"
import {MessageReducer} from "../slices/MessageSlice"
import {userInteractionReducer} from "../slices/userInteractionSlice"

export const store = configureStore({
  reducer: {
    userInteractionReducer,
    UserDataFetchReducer,
    homeContentReducer,
    moreDetailReducer,
    checkerReducer,
    userPostInteractionReducer,
    SendproposalReducer,
    postPostReducer,
    UserProfileSliceReducer,
    MessageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
