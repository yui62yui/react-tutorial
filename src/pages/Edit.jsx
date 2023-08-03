import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery("posts", async () => {
    const response = await axios.get("http://localhost:4000/posts");
    return response.data;
  });

  const selectedData = data?.find((item) => item.id === Number(id));

  const [title, setTitle] = useState(selectedData?.title);
  const [content, setContent] = useState(selectedData?.content);

  const updateMutation = useMutation(
    async (newData) => {
      await axios.put(`http://localhost:4000/posts/${id}`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        navigate(`/`);
      },
    }
  );

  const submitHandler = async () => {
    try {
      const newData = { ...selectedData, title, content };
      await updateMutation.mutate(newData);
    } catch (error) {
      alert("에러발생");
    }
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
            submitHandler();
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
