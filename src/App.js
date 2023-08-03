import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { nowUser } from "./redux/user";
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(nowUser({ email: user?.email }));
      //이처럼 onAuthStateChanged를 사용해 주면 정보가 변경될 때마다 dispatch가 일어나기 때문에 로그인, 회원가입에 각각 dispatch를 넣어 줄 필요가 없다.
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
      {/* props로 useState의 data값 내보냄 */}
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      {/* edit 뒤에도 파라미터로 id 붙일 수 있도록 함 */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
