import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [datas, setDatas] = useState([
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
  ]);
  // UseState를 통해 datas라는 이름으로 3가지의 객체데이터를 배열로 저장함

  const createDataHandler = (newData) => {
    setDatas([...datas, newData]);
    // datas에 Create.jsx에서 추가한 newData추가해서 배열을 업데이트하고, 이를 setDatas로 datas에 저장함.
  };

  const editDataHandler = (newData) => {
    const newDatas = datas.map(
      (data) => (data.id === newData.id ? newData : data)
      // 전체 data와 선택된 데이터를 비교하면서 동일할 경우에는 데이터를 업데이트 하고, 아닌 것들은 기존 것 그대로 둠
    );
    setDatas(newDatas);
  };

  const deleteDataHandler = (selectedData) => {
    const newDatas = datas.filter((data) => data.id !== selectedData.id);
    // selectedData = 메인/상세페이지에서 선택된 각 data, data = 모든 data들, 따라서 선택된 data만 filter를 걸어서 사라지게 함.
    setDatas(newDatas);
  };

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route
        path="/"
        element={<Main datas={datas} deleteDataHandler={deleteDataHandler} />}
      />
      <Route
        path="/detail/:id"
        element={<Detail datas={datas} deleteDataHandler={deleteDataHandler} />}
      />
      {/* props로 useState의 data값 내보냄 */}
      <Route
        path="/create"
        element={<Create createDataHandler={createDataHandler} />}
      />
      <Route
        path="/edit/:id"
        element={<Edit datas={datas} editDataHandler={editDataHandler} />}
      />
      {/* edit 뒤에도 파라미터로 id 붙일 수 있도록 함 */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
