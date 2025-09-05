import React, { useState } from 'react';
import LoginModal from '../../components/auth/LoginModal';
// ✅ 로그인 모달 컴포넌트 import

const AcceptTab = () => {
  const [modalOpen, setModalOpen] = useState(false);  
  // 로그인 모달의 열림/닫힘 상태 관리

  const tologin = (e) => { // 로그인 버튼 클릭 시 실행되는 함수
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지
    setModalOpen(true); // 모달 열림 상태로 변경
  };

  return (
    <div className="text-center p-8">
      <p className="text-2xl font-bold mb-2">가입을 축하드립니다.🎉</p>
      <p className="text-gray-600">로그인 페이지로 돌아가 로그인을 완료해 주세요</p>
      <button
        onClick={tologin} // 버튼 클릭 시 모달 열기
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 font-semibold hover:bg-blue-700 transition-colors"
      >
        로그인하러 가기
      </button>

      {/* LoginModal 컴포넌트 렌더링 */}
      <LoginModal modal={modalOpen} // 모달 열림 여부 전달
      r={() => setModalOpen(!modalOpen)} // 모달 닫기 함수 전달 
      />
      
    </div>
  );
};

export default AcceptTab;