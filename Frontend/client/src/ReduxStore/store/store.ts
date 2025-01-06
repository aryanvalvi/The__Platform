import { configureStore } from "@reduxjs/toolkit";
import UserDataFetchReducer from "../slices/dataFetchSlice";
import { homeContentReducer } from "../slices/homeContentSlice";
import { moreDetailReducer } from "../slices/homeContentSlice";
import { checkerReducer } from "../slices/homeContentSlice";
export const store = configureStore({
  reducer: {
    UserDataFetchReducer,
    homeContentReducer,
    moreDetailReducer,
    checkerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
