import React from "react";
import { useNavigate } from "react-router-dom";

const ChangeInfoApi = () => { // 회원 정보 수정 관련 API (페이지 이동 기능만 포함)
  const navigate = useNavigate();
  // 실제 서버 API 호출이 아니라, 라우터 이동 전용 로직

  const editInfoPassword = () => { // 비밀번호 변경 버튼 클릭 시 실행
    navigate("/");
  }; // 현재는 단순히 "/" 경로로 이동 (추후 실제 비밀번호 변경 페이지로 연결 가능)

  const editInfoBirth = () => { // 생년월일 변경 버튼 클릭 시 실행
    navigate("/");
  }; // 현재는 "/" 경로로 이동 (추후 별도 수정 페이지 연결 가능)

  const finishEdit = () => { // 모든 정보 수정 완료 후 "마이페이지"로 이동
    navigate("/myPage");
  }

  return { editInfoPassword, editInfoBirth, finishEdit, navigate };
};  // 외부에서 사용할 함수들을 객체로 반환

export default ChangeInfoApi;
