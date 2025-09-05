import React, { useState } from 'react'
import TermsDoc from '../components/register/TermsDoc';
import SignUp from '../components/register/SignUp';
import AcceptTab from '../components/register/AcceptTab';

const RegisterApi = () => {
    const agreeList = [
        { id: "terms", label: "이용약관", Component: TermsDoc },
        { id: "signUp", label: "회원정보입력", Component: SignUp },
        { id: "accept", label: "가입완료", Component: AcceptTab },
    ];

    const [accepted, setAccepted] = useState([false]);
    const [currentList, setCurrentList] = useState(0);
    const Current = agreeList[currentList].Component;
    return {agreeList,accepted,setAccepted,currentList,setCurrentList,Current,TermsDoc}
}

export default RegisterApi