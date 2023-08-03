import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataHandler } from "../redux/posts";

export default function Main() {
  // App.js에서 props로 useState의 data값을 받아옴
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);

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
                      if (user.email === data?.author) {
                        alert("정말 삭제하시겠습니까?");
                        return dispatch(deleteDataHandler(data.id));
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
