import React, { useEffect, useState } from "react";
import AcceptTab from "./AcceptTab";
import SignUpApi from "../../api/SignUpApi";

const SignUp = () => {
  const {
    users,
    newUser,
    completed,
    id,
    setId,
    checkMgender,
    checkFgender,
    checkDouble,
    checkEventNo,
    changeHandler,
    finishSignup,
  } = SignUpApi();
  
  useEffect(() => {
    localStorage.setItem("storageinfo", JSON.stringify(users));
  }, [users]);
  
  if (completed) {
    return <AcceptTab />;
  }

  return (
    <div className="font-['Segoe_UI',_sans-serif]">
      <form
        onSubmit={finishSignup}
        className="max-w-md mx-auto my-10 p-7 rounded-xl bg-gradient-to-b from-white to-slate-100 shadow-lg sm:p-6 sm:max-w-lg"
      >
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6 tracking-wide">
          회원정보를 입력해 주세요.
        </h1>
        <ul className="list-none p-0">
          <li className="mb-4">
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex flex-col flex-1">
                <label className="text-sm block mb-1">
                  성<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="user_lastname"
                  onChange={changeHandler}
                  required
                  className="w-full p-2.5 text-sm mt-1 border border-gray-300 rounded-md box-border transition-all duration-200 ease-in-out focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.3)] focus:outline-none"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm block mb-1">
                  이름<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="user_firstname"
                  onChange={changeHandler}
                  required
                  className="w-full p-2.5 text-sm mt-1 border border-gray-300 rounded-md box-border transition-all duration-200 ease-in-out focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.3)] focus:outline-none"
                />
              </div>
            </div>
          </li>
          
          {[
            {label: "생년월일", id: "user_birth", type: "text", placeholder: "YYYYMMDD"},
            {label: "아이디", id: "user_id", type: "text", placeholder: "영문, 숫자 조합(8 ~ 12자)"},
            {label: "비밀번호", id: "user_password", type: "password"},
            {label: "이메일", id: "user_email", type: "email", placeholder: "example@domain.com"},
            {label: "휴대폰 번호", id: "user_telephone", type: "tel", placeholder: "01000000000"},
          ].map(field => (
            <li key={field.id} className="mb-4">
              <label className="text-sm block mb-1">
                {field.label}<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={field.id === 'user_id' ? id : undefined}
                  onChange={field.id === 'user_id' ? (e) => {setId(e.target.value); changeHandler(e);} : changeHandler}
                  required
                  className="w-full p-2.5 text-sm mt-1 border border-gray-300 rounded-md box-border transition-all duration-200 ease-in-out focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.3)] focus:outline-none"
                />
                {field.id === 'user_id' && (
                  <button type="button" onClick={checkDouble} className="ml-2 px-3 py-1.5 text-sm text-white bg-cyan-500 border-none rounded-md cursor-pointer hover:bg-cyan-600 self-start mt-1 w-28">
                    중복확인
                  </button>
                )}
              </div>
              {field.id === 'user_email' && (
                <div className="flex items-center gap-1 mt-2">
                    <input type="checkbox" id="event_no" onClick={checkEventNo} className="mr-1.5"/>
                    <label htmlFor="event_no" className="text-sm">혜택 메일 수신 안 함</label>
                </div>
              )}
            </li>
          ))}

          <li className="mb-4">
            <label className="text-sm block mb-1">
              성별 선택<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <label className="mr-4">
                <input type="radio" name="user_gender" id="user_gender_M" onClick={checkMgender} className="mr-1.5" />
                남자
              </label>
              <label>
                <input type="radio" name="user_gender" id="user_gender_F" onClick={checkFgender} className="mr-1.5" />
                여자
              </label>
            </div>
          </li>
        </ul>
        <button type="submit" className="w-full mt-5 p-2.5 text-white bg-green-600 border-none rounded-md text-base font-semibold cursor-pointer hover:bg-green-700">
          가입하기
        </button>
        <div className="block mt-4 text-center text-sm text-gray-600">
          이미 있는 계정이라면?
          <button type="button" className="w-full p-2.5 mt-2.5 bg-yellow-400 border-none rounded-md cursor-pointer hover:bg-yellow-500">
            계정찾기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;