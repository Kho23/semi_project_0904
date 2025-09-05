import React, { useEffect } from "react";
import logo3 from "../image/semicolonlogo_1.png";
import { useNavigate } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import LoginApi from "../api/LoginApi";

// 사용자 아이콘 SVG (className을 prop으로 받도록 수정)
const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
  }, [setLoginuser]); // 의존성 배열에 setLoginuser 추가

  return (
    <nav className="nav-bar bg-black">
      <div className="nav-container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        {/* 1. 왼쪽: 로고 */}
        <a href="/" className="logo-link">
          <img className="h-10" src={logo3} alt="Cinema Logo" />
        </a>

        {/* 2. 중앙: 메인 메뉴 */}
        <div className="main-menu flex items-center space-x-8">
          {/* 모든 메뉴 아이템에 동일한 클래스 적용 */}
          <a
            onClick={() => checkLogin(() => navigate("reservation"))}
            className="menu-item text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200"
          >
            예매
          </a>
          <a href="/store" className="menu-item text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200">
            스토어
          </a>
          <a href="/FAQ" className="menu-item text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200">
            자주 묻는 질문
          </a>
          <a href="/inquerylist" className="menu-item text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200">
            1대1 문의
          </a>
        </div>

        {/* 3. 오른쪽: 사용자 메뉴 */}
        <div className="user-menu flex items-center space-x-4">
          {!loginuser ? (
            <>
              <button onClick={toggleModal} className="auth-button text-white text-sm font-semibold hover:text-gray-400 transition-colors duration-200">
                로그인
              </button>
              <a
                href="/registerList"
                className="register-button px-4 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                회원가입
              </a>
            </>
          ) : (
            <>
              <button onClick={logoutIdPassword} className="auth-button text-white text-sm font-semibold hover:text-gray-400 transition-colors duration-200">
                로그아웃
              </button>
              <button onClick={goToMyPage} className="mypage-button flex items-center gap-1 text-white text-sm font-semibold hover:text-gray-400 transition-colors duration-200">
                <UserIcon className="w-5 h-5" />
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