import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const slice = createSlice({
  initialState,
  reducers: {
    adduser: (state, action) => {
      const data = {
        name: action.name,
      };
      state.users.push(data);
    },
  },
});
