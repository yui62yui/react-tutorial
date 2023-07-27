import { configureStore } from "@reduxjs/toolkit";
import datas from "./datas";

const store = configureStore({
  reducer: {
    datas: datas.reducer,
  },
});

export default store;
