import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function Main() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const loginAlert = () => {
    alert("로그인 후 이용해 주세요");
  };

  const { data, isLoading, isError, error } = useQuery("posts", async () => {
    const response = await axios.get("http://localhost:4000/posts");
    return response.data;
  });

  const deleteMutation = useMutation(
    (id) => {
      return axios.delete(`http://localhost:4000/posts/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        navigate(`/`);
      },
    }
  );

  if (isLoading) {
    return <div>데이터 가져오는 중임</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

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
              if (!user.email) {
                return loginAlert();
              }
              navigate("/create");
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
        {data.map((post) => (
          <div
            key={post.id}
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
                navigate(`/detail/${post.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{post.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.content}
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
              <div>{post.author}</div>
              <div>
                <button
                  onClick={() => {
                    if (!user.email) {
                      return loginAlert();
                    } else {
                      if (user.email === post?.author) {
                        return navigate(`/edit/${post.id}`);
                      } else {
                        return alert("게시글 수정은 작성자만 가능합니다!");
                      }
                    }
                  }}
                  // 삼항연산자 두 번 쓰면 남이 헷갈린다. (onclick안에는 if else쓸 수 있음) => if를 두 번 주는 게 나음
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
                    if (!user.email) {
                      return loginAlert();
                    } else {
                      if (user.email === post?.author) {
                        alert("정말 삭제하시겠습니까?");
                        return deleteMutation.mutate(post.id);
                      } else {
                        return alert("게시글 삭제는 작성자만 가능합니다!");
                      }
                    }
                  }}
                  // 삼항연산자 두 번 쓰면 남이 헷갈린다. (onclick안에는 if else쓸 수 있음) => if를 두 번 주는 게 나음
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
