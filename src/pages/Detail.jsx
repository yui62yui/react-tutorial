import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataHandler } from "../redux/posts";
import { auth } from "../firebase";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const selectedData = posts?.find((data) => data.id === id);

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
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {selectedData?.title}
          {/* selectedData가 없을 때를 대비해서 optional chaining을 거는 게 좋다! */}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {selectedData?.content}
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
              auth.currentUser !== null
                ? auth.currentUser.email === selectedData?.author
                  ? navigate(`/edit/${selectedData?.id}`)
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
                ? auth.currentUser.email === selectedData?.author
                  ? deletePost(selectedData?.id)
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
      </Container>
    </>
  );
}
