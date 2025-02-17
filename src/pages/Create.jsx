import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const user = useSelector((state) => state.user);

  const mutation = useMutation(async () => {
    await axios.post("http://localhost:4000/posts", {
      title,
      content,
      author: user.email,
    });
  });

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
            mutation.mutate();
            navigate("/");
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
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
