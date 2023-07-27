import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editDataHandler } from "../redux/datas";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const datas = useSelector((state) => state.datas);
  const selectedData = datas?.find((data) => data.id === id);
  // Detail.jsx와 마찬가지로 파라미터(id)와 id값이 동일한 data만 선택하는 과정

  const [title, setTitle] = useState(selectedData.title);
  const [content, setContent] = useState(selectedData.content);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newData = { ...selectedData, title, content };
      // setNewData(newData);
      await dispatch(editDataHandler(newData));
      // newData를 먼저 저장하고 editDataHandler를 실행시켜 주기 위해 async, await 이용함
      navigate("/");
      // 수정 후 메인페이지로 이동
    } catch (error) {}
  };

  return (
    <Fragment>
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
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              // defaultValue={selectedData.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // input에 글자가 입력될 때마다 title이 setTitle로 인해 e.target.value(input내 글자)로 변경됨
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
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
              // defaultValue={selectedData.content}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
            onClick={submitHandler}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
