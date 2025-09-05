import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginApi = () => { // LoginApi 훅
    // 로그인 상태 관리 및 로그인 관련 동작(모달, 내 정보, 로그아웃 등)을 처리
    const [loginuser, setLoginuser] = useState(null);
    // 현재 로그인된 사용자 정보를 상태로 관리 (null이면 로그인되지 않은 상태)
    const navigate = useNavigate();
    // 페이지 이동을 위한 react-router-dom의 useNavigate 훅
    const [modalOpen, setModalOpen] = useState(false); 
    // 로그인 필요 시 표시할 모달의 열림/닫힘 상태

    const linkToRegisterList = () => { 
        if (!loginuser) { // 로그인되어 있지 않은 경우
            navigate("/registerList"); // 회원가입 목록 페이지로 이동
        }  
    }; 
    /**
     * 로그인이 필요한 동작을 실행합니다.
     * @param {Function} action - 로그인이 되어있을 때 실행할 함수입니다.
     */
    const checkLogin = (action) => {
        if (loginuser) {
            action()
        } else {
            alert("로그인 후 이용해주세요.");
            setModalOpen(true);
        } 
    }; 

    const toggleModal = () => {
        if (!loginuser) { // 로그인 상태가 아닐 때
            setModalOpen(!modalOpen); // 모달 열림/닫힘 토글
        }
    }; 

    const logoutIdPassword = () => { // 로그아웃 처리 함수
        localStorage.removeItem("loginUser"); // localStorage에서 로그인 정보 삭제
        setLoginuser(null); // Loginuser 상태 초기화
        alert("로그아웃 되었습니다."); 
        navigate("/"); // 홈으로 이동
    };

    const infotype = () => { // 내 정보 표시 문자열 생성 함수
        if (!loginuser) {
            return "내 정보"; // 로그인되어 있지 않으면 "내 정보" 표시
        } else {
            return `${loginuser.user_lastname}${loginuser.user_firstname}`;
        } // 로그인되어 있으면 "성 + 이름" 표시
    };

    const goToMyPage = () => { // 마이페이지 이동 함수
        if (loginuser) {
            navigate("/myPage"); // 로그인 상태일 때만 이동
        } else {
            setModalOpen(true); // 아니면 로그인 모달 열기
        }
    };
    return {
        linkToRegisterList, checkLogin, toggleModal, logoutIdPassword,
        infotype, goToMyPage, loginuser, setLoginuser, navigate, modalOpen
    } // 훅에서 반환하는 객체: 외부 컴포넌트에서 로그인 관련 상태와 함수 사용 가능
}

export default LoginApi