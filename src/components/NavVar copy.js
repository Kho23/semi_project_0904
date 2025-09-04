import React from "react";
import logo from "../image/cinemalogo.png";
import logo2 from "../image/logo2.png";
import logo3 from "../image/logo3-removebg-preview.png";
import SignUp from "../pages/SignUp";
import { useNavigate } from "react-router-dom";

// 사용자 아이콘 SVG
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

const NavVar = () => {
  const navigate = useNavigate();
  const linkToSignUp = () => {
    navigate("/signup");
  };
  const linkToFAQ = () => {
    navigate("/FAQ");
  };
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="flex justify-between items-center h-20 max-w-7xl mx-auto px-8">
        {/* 1. 왼쪽: 로고 */}
        <a href="/" className="flex-shrink-0">
          <img className="h-12 w-auto" src={logo3} alt="Cinema Logo" />
        </a>

        {/* 2. 중앙: 메인 메뉴 (시안 1) */}
        <div className="flex items-center gap-10 text-gray-300 font-semibold">
          {/* 각 메뉴 아이템을 relative로 설정 */}
          <a href="/" className="relative group transition-colors duration-300">
            <span>예매</span>
            {/* 밑줄 효과: 평소엔 너비 0, group-hover 시 너비 100% */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a
            href="/store"
            className="relative group transition-colors duration-300"
          >
            <span>스토어</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a
            href="/FAQ"
            className="relative group transition-colors duration-300"
          >
            <span>자주 묻는 질문</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a
            href="/inquerylist"
            className="relative group transition-colors duration-300"
          >
            <span>1대1 문의</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
        </div>

        {/* 3. 오른쪽: 사용자 메뉴 */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <a
            href="/login"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            로그인
          </a>
          <a
            onClick={linkToSignUp}
            href="/signup"
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            회원가입
          </a>
          <a
            href="/mypage"
            className="flex items-center gap-2 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white px-4 py-2 rounded-md transition-all duration-300"
          >
            <UserIcon />내 정보
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavVar;
