import React, { useEffect, useState } from "react";
import AcceptTab from "../register/AcceptTab";

const SignUp = () => {
  // --- 모든 state와 로직을 SignUp.js로 통합 ---

  // JSON.parse 오류가 발생하지 않도록 try-catch 구문을 추가합니다.
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("storageinfo");
      return savedUsers ? JSON.parse(savedUsers) : [];
      // 데이터가 있으면 파싱하고, 없으면 빈 배열([])을 반환
    } catch (error) {
      // 파싱 중 오류가 발생하면 (데이터가 깨졌으면) 콘솔에 오류를 남기고 
      // 안전하게 빈 배열을 반환
      console.error("Failed to parse users from localStorage", error);
      return [];
    }
  });

  const [newUser, setNewUser] = useState({ 
    // newUser: 현재 회원가입 폼에 입력 중인 사용자 정보
    user_lastname: "",
    user_firstname: "",
    user_birth: "",
    user_id: "",
    user_password: "",
    user_email: "",
    user_telephone: "",
    user_gender: "",
    eventNo: true, // 기본값: 수신 동의
    cart: [], // 장바구니 초기화
  });
  
  const [completed, setCompleted] = useState(false);
  // completed: 회원가입이 끝났는지 여부
  const [id, setId] = useState("");
  // id: 아이디 입력 값 (중복 체크 용도)
  const [buttonCheck, setButtoncheck] = useState(false);
  // buttonCheck: 아이디 중복확인 완료 여부

  
  useEffect(() => {
    localStorage.setItem("storageinfo", JSON.stringify(users));
  }, [users]); // users state가 변경될 때마다 localStorage에 자동으로 저장

  const checkMgender = () => {
    setNewUser((i) => ({ ...i, user_gender: "Male" }));
  }; // 성별 선택 함수

  const checkFgender = () => {
    setNewUser((i) => ({ ...i, user_gender: "Female" }));
  }; // 성별 선택 함수

  const checkDouble = () => { // 아이디 중복 확인 함수
    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }

    const idDuplicate = users.some(user => user && user.user_id === id);  // users 배열에서 중복 아이디 존재 여부 확인
    if (idDuplicate) { // 만약 중복이면
      alert("이미 존재하는 아이디입니다.");
      setId(""); // 알림 및 입력창 비움
    } else { // 중복이 아니라면
      alert("사용 가능한 아이디입니다.");
      setButtoncheck(true); // 알림 및 중복 확인 완료 상태 갱신
    }
  };

  const checkEventNo = () => { // 이메일 수신 거부 체크 시
    alert("이벤트 메일 수신을 거절하였습니다");
    setNewUser((i) => ({ ...i, eventNo: !i.eventNo }));
  }; // 기존 상태(i)를 펼쳐서 eventNo 값을 반전시킴(false)

  const changeHandler = (e) => { // input 값 변경 시 newUser에 반영하는 핸들러
    const { value, id } = e.target; // 입력된 값(value)과 input의 id 속성 가져오기
    setNewUser((i) => ({ ...i, [id]: value }));
  }; // 기존 상태(i)를 펼쳐서 input의 id를 key로 하여 해당 key의 값을 value로 업데이트

  const finishSignup = (e) => { // 회원가입 완료 처리
    e.preventDefault(); // form 기본 제출 동작 방지
    if (buttonCheck) { // 아이디 중복 확인이 완료된 경우
      alert("회원가입이 완료되었습니다"); // 성공 메시지
      setCompleted(true); // 회원가입 완료 상태로 변경
      setUsers((prevUsers) => [...prevUsers, newUser]);
      // users 배열에 신규 회원 추가
    } else { // 아이디 중복 확인이 되지 않은 경우
      alert("아이디 중복 확인을 해주세요."); // 재시도 메시지
    }
  };

  if (completed) { // 회원가입이 완료되면 -> AcceptTab 화면으로 이동
    return <AcceptTab />;
  }

  // --- JSX 부분 (회원가입 UI 폼) ---
  return (
    <div className="font-['Segoe_UI',_sans_serif]">
      <form
        onSubmit={finishSignup} // 폼 제출 시 finishSignup 함수 실행
        className="max-w-md mx-auto my-10 p-7 rounded-xl bg-gradient-to-b from-white to-slate-100 shadow-lg sm:max-w-lg"
      >

        {/* 제목 */}
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6 tracking-wide">
          회원정보를 입력해 주세요.
        </h1>
        <ul className="list-none p-0">

          {/* 성 + 이름 입력 */}
          <li className="mb-4"> 
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <div className="flex flex-col flex-1">
                <label className="text-sm block mb-1">
                  성<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="user_lastname"
                  onChange={changeHandler} // 입력값이 newUser.user_lastname에 반영됨
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
                  onChange={changeHandler} // 입력값이 newUser.user_firstname에 반영됨
                  required
                  className="w-full p-2.5 text-sm mt-1 border border-gray-300 rounded-md box-border transition-all duration-200 ease-in-out focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.3)] focus:outline-none"
                />
              </div>
            </div>
          </li>

          {/* 반복되는 필드: 생년월일, 아이디, 비밀번호, 이메일, 휴대폰 */}
          {[
            { label: "생년월일", id: "user_birth", type: "text", placeholder: "YYYYMMDD" },
            { label: "아이디", id: "user_id", type: "text", placeholder: "영문, 숫자 조합(8 ~ 12자)" },
            { label: "비밀번호", id: "user_password", type: "password" },
            { label: "이메일", id: "user_email", type: "email", placeholder: "example@domain.com" },
            { label: "휴대폰 번호", id: "user_telephone", type: "tel", placeholder: "01000000000" },
          ].map(field => (
            <li key={field.id} className="mb-4">
              <label className="text-sm block mb-1">
                {field.label}<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">

                {/* 공통 input 요소 */}
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={field.id === 'user_id' ? id : undefined}
                  // 아이디 입력 필드일 경우 id 상태와 연동 + 중복확인 로직 함께 실행
                  onChange={field.id === 'user_id' ? (e) => { setId(e.target.value); changeHandler(e); } : changeHandler}
                  required
                  className="w-full p-2.5 text-sm mt-1 border border-gray-300 rounded-md box-border transition-all duration-200 ease-in-out focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.3)] focus:outline-none"
                />

                {/* 아이디 입력 필드일 때만 → 옆에 중복확인 버튼 표시 */}
                {field.id === 'user_id' && (
                  <button type="button" onClick={checkDouble} className="ml-2 px-3 py-1.5 text-sm text-white bg-cyan-500 border-none rounded-md cursor-pointer hover:bg-cyan-600 self-start mt-1 whitespace-nowrap">
                    중복확인
                  </button>
                )}
              </div>

              {/* 이메일 필드일 경우 → 수신 거부 체크박스 추가 */}
              {field.id === 'user_email' && (
                <div className="flex items-center gap-1 mt-2">
                    <input type="checkbox" id="event_no" onClick={checkEventNo} className="mr-1.5"/>
                    <label htmlFor="event_no" className="text-sm">혜택 메일 수신 안 함</label>
                </div>
              )}
            </li>
          ))}

          {/* 성별 선택 라디오 버튼 */}
          <li className="mb-4">
            <label className="text-sm block mb-1">
              성별 선택<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              {/* 남자 선택 */}
              <label className="mr-4">
                <input type="radio" name="user_gender" id="user_gender_M" onClick={checkMgender} className="mr-1.5" />
                남자
              </label>
              {/* 여자 선택 */}
              <label>
                <input type="radio" name="user_gender" id="user_gender_F" onClick={checkFgender} className="mr-1.5" />
                여자
              </label>
            </div>
          </li>
        </ul>

        {/* 가입하기 버튼 */}
        <button type="submit" className="w-full mt-5 p-2.5 text-white bg-green-600 border-none rounded-md text-base font-semibold cursor-pointer hover:bg-green-700">
          가입하기
        </button>

        {/* 이미 계정이 있을 경우 → 계정찾기 버튼 */}
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
