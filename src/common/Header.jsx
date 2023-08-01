import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const logOut = async () => {
    await auth.signOut();
    navigate("/");
    alert("로그아웃하였습니다.");
  };

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <Link
        to="/"
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        <FaHome
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </Link>
      {auth.currentUser === null ? (
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <p>{auth.currentUser.email}</p>
          <button
            style={{
              height: "30px",
            }}
            onClick={logOut}
          >
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
}
