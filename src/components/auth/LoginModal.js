import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";

/**
 * LoginModal 컴포넌트
 * 로그인 모달 UI 및 로그인 처리 기능을 제공합니다.
 * @param {boolean} modal - 모달 열림/닫힘 상태
 * @param {function} r - 모달 토글 함수
 */

const LoginModal = ({ modal, r }) => {  
  const [id, setId] = useState(""); // 입력한 아이디 상태 관리
  const [password, setPassword] = useState(""); // 입력한 비밀번호 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  
  const loginIdPassword = () => {  // 아이디와 비밀번호로 로그인 처리 함수
    const storageinfo = JSON.parse(localStorage.getItem("storageinfo")) || [];
    // localStorage에 저장된 사용자 목록 불러오기 (없으면 빈 배열)
    const findinfo = storageinfo.find((i) =>i && i.user_id === id && i.user_password === password);
    // 입력한 id / password와 일치하는 사용자 검색
    
    if(findinfo) { // 로그인 성공 시: 
      localStorage.setItem("loginUser", JSON.stringify(findinfo)); // 로그인한 사용자 정보를 localStorage에 저장
      alert(`${findinfo.user_lastname}${findinfo.user_firstname}님 로그인 하셨습니다.`); // 사용자 성+이름을 합쳐서 환영 메시지 출력
      navigate("/"); // 메인 페이지로 이동 후 새로고침
      window.location.reload();
    } else { // 로그인 실패 시:
      alert("아이디 혹은 비밀번호를 다시 확인해 주세요");
      setId(""); // 알림 메시지 및 입력 값 초기화
      setPassword("");
    }
  };  
  
  return ( // Reactstrap Modal 컴포넌트 사용
    <Modal 
      isOpen={modal} // 모달 열림 여부
      toggle={r} // 닫기/열기 함수
      backdropClassName="bg-black/50" 
      contentClassName="rounded-lg p-5 max-w-sm mx-auto shadow-lg">

      {/* 모달 헤더 */}
      <ModalHeader 
        toggle={r} 
        className="bg-gray-800 text-white border-b-0 text-xl font-bold">
        Login
      </ModalHeader>

      {/* 모달 본문 */}
      <ModalBody className="flex flex-col gap-4">
        {/* 로그인 폼 (submit 시 loginIdPassword 실행) */}
        <Form onSubmit={(e) => { e.preventDefault(); loginIdPassword(); }}>

          {/* 아이디 입력 필드 */}
          <div>
            <Label className="font-semibold mb-1 block">ID</Label>
            <Input 
              type="text" 
              placeholder="아이디를 입력하세요" 
              value={id} 
              onChange={(e) => setId(e.target.value)}
              className="p-2.5 rounded-md border border-gray-300 w-full text-base"
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div>
            <Label className="font-semibold mb-1 block">Password</Label>
            <Input 
              type="password" 
              placeholder="비밀번호를 입력하세요" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="p-2.5 rounded-md border border-gray-300 w-full text-base"
            />

          {/* 로그인 버튼 */}
          </div>
          <Button 
            color="dark" 
            type="submit" 
            className="w-full p-2.5 rounded-md font-bold cursor-pointer transition-all duration-200 ease-in-out hover:bg-black hover:text-white mt-4"
          >
            Login
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;