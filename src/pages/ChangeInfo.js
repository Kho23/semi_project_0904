import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import ChangeInfoApi from "../api/ChangeInfoApi";

const ChangeInfo = () => { 
  const { editInfoPassword, editInfoBirth, finishEdit } = ChangeInfoApi(); 
  // ChangeInfoApi에서 제공하는 사용자 정보 수정 관련 함수 가져오기
  const [loginUser, setloginUser] = useState({}); // 로그인한 사용자 정보 상태

  useEffect(() => { // 컴포넌트 마운트 시 localStorage에서 로그인 사용자 정보 불러오기
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    setloginUser(forSet);
  }, []);

  return (
    <div>
      <ul>

        {/* 이름 필드 (읽기 전용) */}
        <li>
          <div>
            이름
            <input
              type="text"
              id="changeName"
              value={loginUser.user_lastname + loginUser.user_firstname}
              readOnly
            />
          </div>
        </li>

        {/* 아이디 필드 (읽기 전용) */}
        <li>
          <div>
            아이디
            <input
              type="text"
              id="changeId"
              value={loginUser.user_id}
              readOnly
            />
          </div>
        </li>

        {/* 비밀번호 필드 (읽기 전용 + 수정 아이콘 클릭 시 editInfoPassword 실행) */}
        <li>
          <div>
            비밀번호
            <input
              type="password"
              id="changePassword"
              value={loginUser.user_password}
              readOnly
            />
          </div>
          <i onClick={editInfoPassword}>
            <FiEdit3 /> {/* 수정용 연필 아이콘 */}
          </i>
        </li>

        {/* 생년월일 필드 (읽기 전용 + 수정 아이콘 클릭 시 editInfoBirth 실행) */}
        <li>
          <div>
            생년월일
            <input
              type="text"
              id="changeBirth"
              value={loginUser.user_birth}
              readOnly
            />
          </div>
          <i onClick={editInfoBirth}>
            <FiEdit3 /> {/* 수정용 연필 아이콘 */}
          </i>
        </li>

        {/* 이메일 필드 (수정 가능) */}
        <li>
          <div>
            이메일
            <input
              type="email"
              id="changeEmail"
              name="user_email" // name 속성으로 setState에 키 값 전달
              value={loginUser.user_email}
              onChange={(e) => {
                const { name, value } = e.target;
                setloginUser((i) => ({ ...i, [name]: value }));
              }} // 기존 loginUser 상태를 펼쳐서 변경된 값만 업데이트
              required
            />
          </div>
        </li>

        {/* 전화번호 필드 (수정 가능) */}
        <li>
          <div>
            전화번호
            <input
              type="tel"
              id="changeTelephone"
              placeholder={loginUser.user_telephone}
              // 기존 번호를 placeholder로 표시
              required
            />
          </div>
        </li>

        {/* 수정 완료 버튼 → finishEdit 함수 실행 */}
        <button onClick={finishEdit}>수정 완료</button>
      </ul>
    </div>
  );
};

export default ChangeInfo;
