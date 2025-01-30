import { configureStore } from "@reduxjs/toolkit";
import UserDataFetchReducer from "../slices/dataFetchSlice";
import { homeContentReducer, SendproposalReducer, userPostInteractionReducer } from "../slices/homeContentSlice";
import { moreDetailReducer } from "../slices/homeContentSlice";
import { checkerReducer } from "../slices/homeContentSlice";
import { postPostReducer } from "../slices/PostpostSlice";
import { UserProfileSliceReducer } from "../slices/UserProfile";

export const store = configureStore({
  reducer: {
    UserDataFetchReducer,
    homeContentReducer,
    moreDetailReducer,
    checkerReducer,
    userPostInteractionReducer,
    SendproposalReducer,
    postPostReducer,
    UserProfileSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
 