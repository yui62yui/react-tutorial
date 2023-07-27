import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { store } from "./store";

let datas = createSlice({
  name: "datas",
  initialState: [
    {
      id: nanoid(),
      title: "이것은 제목입니다1",
      content: "이것은 내용인뎁쇼1",
      author: "111@naver.com",
    },
    {
      id: nanoid(),
      title: "이것은 제목입니다2",
      content: "이것은 내용인뎁쇼2",
      author: "222@naver.com",
    },
    {
      id: nanoid(),
      title: "이것은 제목입니다3",
      content: "이것은 내용인뎁쇼3",
      author: "333@naver.com",
    },
  ],
});

const store = configureStore({
  reducer: {
    datas: datas.reducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Routes, Route 태그 및 react-router-dom을 사용하기 위해선 최상단에 BrowserRouter로 감싸줘야한다 */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
