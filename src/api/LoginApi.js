import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginApi = () => {
    const [loginuser, setLoginuser] = useState(null);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태
    const linkToRegisterList = () => {
        if (!loginuser) {
            navigate("/registerList");
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
        if (!loginuser) {
            setModalOpen(!modalOpen);
        }
    };

    const logoutIdPassword = () => {
        localStorage.removeItem("loginUser");
        setLoginuser(null);
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    const infotype = () => {
        if (!loginuser) {
            return "내 정보";
        } else {
            return `${loginuser.user_lastname}${loginuser.user_firstname}`;
        }
    };

    const goToMyPage = () => {
        if (loginuser) {
            navigate("/myPage");
        } else {
            setModalOpen(true);
        }
    };
    return {
        linkToRegisterList, checkLogin, toggleModal, logoutIdPassword,
        infotype, goToMyPage, loginuser, setLoginuser, navigate, modalOpen
    }
}

export default LoginApi