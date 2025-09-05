import React, { useState } from 'react'
import TermsDoc from '../components/register/TermsDoc';
import SignUp from '../components/register/SignUp';
import AcceptTab from '../components/register/AcceptTab';

const RegisterApi = () => {  // 회원가입 절차에 사용할 화면 목록
    const agreeList = [
        { id: "terms", label: "이용약관", Component: TermsDoc },
        { id: "signUp", label: "회원정보입력", Component: SignUp },
        { id: "accept", label: "가입완료", Component: AcceptTab },
    ];  // 각 단계는 id, 화면에 표시할 이름(label), 해당 컴포넌트(Component)로 구성

    const [accepted, setAccepted] = useState([false]); // 약관 동의 여부 상태 (배열 형태로 저장, 초기값은 [false])
    const [currentList, setCurrentList] = useState(0); // 현재 진행 중인 단계 상태 (0: 이용약관, 1: 회원정보입력, 2: 가입완료)
    const Current = agreeList[currentList].Component; // 현재 단계에서 렌더링할 컴포넌트
 
    return {agreeList,accepted,setAccepted,currentList,setCurrentList,Current,TermsDoc}; 
    // 컴포넌트 대신 값들을 객체 형태로 반환해서 다른 곳에서 쉽게 가져다 쓸 수 있도록 설계
}

export default RegisterApi