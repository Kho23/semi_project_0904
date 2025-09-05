import React, { useEffect, useState } from "react";
import logo3 from "../image/semicolonlogo_1.png";
import { useNavigate } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import LoginApi from "../api/LoginApi";
import "../css/NavVar.css"; // CSS 파일 import

// 사용자 아이콘 SVG (className을 prop으로 받도록 수정)
const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w.org/2000/svg"
    viewBox="0 0 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

const NavVar = () => {
  const {
    linkToRegisterList,
    checkLogin,
    toggleModal,
    logoutIdPassword,
    infotype,
    goToMyPage,
    setLoginuser,
    navigate,
    modalOpen,
    loginuser,
  } = LoginApi();

  useEffect(() => {
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    if (forSet) {
      setLoginuser(forSet);
    }
  }, []);

  return (
    <nav className="nav-bar bg-black">
      <div className="nav-container">
        {/* 1. 왼쪽: 로고 */}
        <a href="/" className="logo-link pb-3.5">
          <img className="logo-image" src={logo3} alt="Cinema Logo" />
        </a>

        {/* 2. 중앙: 메인 메뉴 */}
        <div className="main-menu">
          <button
            onClick={() => checkLogin(() => navigate("reservation"))}
            className="menu-item"
          >
            예매
          </button>
          <a href="/store" className="menu-item">
            스토어
          </a>
          <a href="/FAQ" className="menu-item">
            자주 묻는 질문
          </a>
          <a href="/inquerylist" className="menu-item">
            1대1 문의
          </a>
        </div>

        {/* 3. 오른쪽: 사용자 메뉴 */}
        <div className="user-menu">
          {!loginuser ? (
            <>
              <button onClick={toggleModal} className="auth-button">
                로그인
              </button>
              <a
                onClick={linkToRegisterList}
                href="/registerList"
                className="register-button"
              >
                회원가입
              </a>
            </>
          ) : (
            <>
              <button onClick={logoutIdPassword} className="auth-button">
                로그아웃
              </button>
              <button onClick={goToMyPage} className="mypage-button">
                <UserIcon className="user-icon" />
                <span>{infotype()}</span>
              </button>
            </>
          )}
        </div>
      </div>
      {/* 모달 렌더링 */}
      <LoginModal modal={modalOpen} r={toggleModal} />
    </nav>
  );
};

export default NavVar;