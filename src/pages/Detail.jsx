import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataHandler } from "../redux/posts";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const data = posts?.find((data) => data.id === id);

  const user = useSelector((state) => state.user);

  const loginAlert = () => {
    alert("로그인 후 이용해 주세요");
  };

  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {data?.title}
          {/* data가 없을 때를 대비해서 optional chaining을 거는 게 좋다! */}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {data?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              if (!user.email) {
                return loginAlert();
              } else {
                if (user.email === data?.author) {
                  return navigate(`/edit/${data.id}`);
                } else {
                  return alert("게시글 수정은 작성자만 가능합니다!");
                }
              }
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
            onClick={async () => {
              if (!user.email) {
                return loginAlert();
              } else {
                if (user.email === data?.author) {
                  alert("정말 삭제하시겠습니까?");
                  await dispatch(deleteDataHandler(data.id));
                  return navigate("/");
                } else {
                  return alert("게시글 삭제는 작성자만 가능합니다!");
                }
              }
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
      </Container>
    </>
  );
}
