import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";
import user from "./user.js";

const store = configureStore({
  reducer: {
    posts: posts.reducer,
    user: user.reducer,
  },
});

export default store;
