import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
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
];

let datas = createSlice({
  name: "datas",
  initialState,
  reducers: {
    createDataHandler: (state, action) => {
      const newData = action.payload;
      // 아랫부분에 action.payload를 적으려니 오류 떠서 action.payload를 newData라는 변수명으로 저장해 줌
      return [...state, newData];
      // return 꼭 적어줘야 됨
    },
    editDataHandler: (state, action) => {
      return state.map((data) => {
        return data.id === action.payload.id ? action.payload : data;
      });
    },
    deleteDataHandler: (state, action) => {
      return state.filter((data) => data.id !== action.payload.id);
    },
  },
});

export const { createDataHandler, editDataHandler, deleteDataHandler } =
  datas.actions;

// 각각의 action reducer들을 바깥으로 꺼내서 각 components에서 사용할 수 있도록 함

export default datas;
