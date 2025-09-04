import React, { useEffect, useState } from "react";
import logo3 from "../image/logo3-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import LoginApi from "../api/LoginApi";

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
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="flex justify-between items-center h-20 max-w-7xl mx-auto px-8">
        <a href="/" className="flex-shrink-0">
          <img className="h-12 w-auto" src={logo3} alt="Cinema Logo" />
        </a>

        <div className="flex items-center gap-10 text-gray-300 font-semibold">
          <button
            onClick={() => checkLogin(() => navigate("reservation"))}
            className="transition-colors duration-300 ease-in-out hover:text-red-500"
          >
            예매
          </button>
          <a href="/store" className="transition-colors duration-300 ease-in-out hover:text-red-500">
            스토어
          </a>
          <a href="/FAQ" className="transition-colors duration-300 ease-in-out hover:text-red-500">
            자주 묻는 질문
          </a>
          <a href="/inquerylist" className="transition-colors duration-300 ease-in-out hover:text-red-500">
            1대1 문의
          </a>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          {!loginuser ? (
            <>
              <button onClick={toggleModal} className="text-gray-400 transition-colors duration-300 ease-in-out hover:text-white">
                로그인
              </button>
              <a
                onClick={linkToRegisterList}
                href="/registerList"
                className="text-white bg-red-600 px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-red-700"
              >
                회원가입
              </a>
            </>
          ) : (
            <>
              <button onClick={logoutIdPassword} className="text-gray-400 transition-colors duration-300 ease-in-out hover:text-white">
                로그아웃
              </button>
              <button onClick={goToMyPage} className="flex items-center gap-2 text-gray-400 border border-gray-700 px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:border-gray-500 hover:text-white">
                <UserIcon className="w-5 h-5" />
                <span>{infotype()}</span>
              </button>
            </>
          )}
        </div>
      </div>
      <LoginModal modal={modalOpen} r={toggleModal} />
    </nav>
  );
};

export default NavVar;