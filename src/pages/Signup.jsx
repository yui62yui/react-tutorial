import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const signUp = async (event) => {
    event.preventDefault();
    // 오류 상황에서도 저장 버튼 눌렀을 때 입력값 무조건 사라지는 거 방지하기 위해 최상단에 올림
    try {
      if (email === "") {
        alert("이메일을 입력해 주세요");
      } else if (password === "") {
        alert("비밀번호를 입력해 주세요");
      } else if (checkPassword === "") {
        alert("비밀번호 확인란을 입력해 주세요");
      } else if (password !== checkPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요");
      } else {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // dispatch(nowUser({ email: newUser.user }));
        // App.js 에 onAuth... 를 사용했기에 dispatch가 필요없어짐.
        alert("로그인이 완료되었습니다!");
        navigate("/");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("이미 사용 중인 이메일입니다.");
          break;
        case "auth/weak-password":
          alert("비밀번호는 6글자 이상이어야 합니다.");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패 하였습니다.");
          break;
        case "auth/invalid-email":
          alert(
            "잘못된 이메일 형식입니다. 이메일 형식은 email@email.com 형식이어야 합니다."
          );
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("로그인에 실패 하였습니다.");
          break;
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호 확인"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                value={checkPassword}
                onChange={(e) => {
                  setCheckPassword(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={signUp}
              >
                회원가입하기
              </button>
            </div>
            <Link
              to="/login"
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하러 가기
              </button>
            </Link>
          </form>
        </div>
      </Container>
    </>
  );
}
