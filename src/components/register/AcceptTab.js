import React, { useState } from 'react';
import LoginModal from '../../components/auth/LoginModal'; // LoginModal import

const AcceptTab = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태

  const tologin = (e) => {
    e.preventDefault();
    setModalOpen(true); // 클릭 시 모달 열기
  };

  return (
    <div>
      <p>가입을 축하드립니다.🎉</p>
      <p>로그인 페이지로 돌아가 로그인을 완료해 주세요</p>  
      <button
        onClick={tologin}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
      >
        로그인하러 가기
      </button>

      {/* 모달 렌더링 */}
      <LoginModal modal={modalOpen} r={() => setModalOpen(!modalOpen)} />
    </div>
  );
};

export default AcceptTab;
