import React, { useState } from "react";

import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function Create({ createDataHandler }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("제출!");
          }}
        >
          <div>
            <input
              placeholder="제목"
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              const newData = {
                id: nanoid(),
                title,
                content,
                author: "작성자",
              };
              // newData로 입력받은 title, content를 넣어 저장
              createDataHandler(newData);
              // newData를 태워서 App.js의 createDataHandler를 실행하도록 함
              navigate("/");
              // 추가되면 메인으로 이동
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
