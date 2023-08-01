import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataHandler } from "../redux/posts";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Main() {
  // App.js에서 props로 useState의 data값을 받아옴
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  // useSelector를 통해 redux로 관리하는 posts라는 데이터를 받아옴

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);
  // 로그인 정보가 있을 경우 화면 첫 랜더링 시에 로그인/로그아웃 대신에 이메일과 로그아웃이 보이게 해야 되는데 이게 제대로 안 먹혀서 이렇게 하니까 됨...

  const deletePost = (id) => {
    alert("정말 삭제하시겠습니까?");
    dispatch(deleteDataHandler(id));
  };

  const loginAlert = () => {
    alert("로그인 후 이용해 주세요");
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={() => {
              auth.currentUser !== null ? navigate("/create") : loginAlert();
            }}
            // currentUser 정보가 있으면 추가 컴포넌트로 이동, 없으면 알림창
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {posts.map((data) => (
          <div
            key={data.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                navigate(`/detail/${data.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{data.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{data.author}</div>
              <div>
                <button
                  onClick={() => {
                    auth.currentUser !== null
                      ? auth.currentUser.email === data?.author
                        ? navigate(`/edit/${data.id}`)
                        : // 파라미터 이용하여 id 특정하기
                          alert("게시글 수정은 작성자만 가능합니다!")
                      : loginAlert();
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                    marginRight: "6px",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    auth.currentUser !== null
                      ? auth.currentUser.email === data?.author
                        ? deletePost(data?.id)
                        : alert("게시글 삭제는 작성자만 가능합니다!")
                      : loginAlert();
                  }}
                  style={{
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
