import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { nowUser } from "../redux/user";

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      {user.email ? (
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <p>{user.email}</p>
          <button
            style={{
              height: "30px",
            }}
            onClick={async () => {
              await signOut(auth);
              dispatch(nowUser({ email: null }));
              alert("로그아웃 되었습니다!");
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
}
