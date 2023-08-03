import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    email: null,
  },
  reducers: {
    nowUser: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { nowUser } = user.actions;

export default user;
