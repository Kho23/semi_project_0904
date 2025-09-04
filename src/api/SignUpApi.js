import React, { useEffect, useState } from "react";

const SignUpApi = () => {
    const [users, setUsers] = useState([
        {
            user_lastname: "",
            user_firstname: "",
            user_birth: "",
            user_id: "",
            user_password: "",
            user_email: "",
            user_telephone: "",
            user_gender: "",
            eventNo: true,
        },
    ]);
    const [newUser, setNewUser] = useState({
        user_lastname: "",
        user_firstname: "",
        user_birth: "",
        user_id: "",
        user_password: "",
        user_email: "",
        user_telephone: "",
        user_gender: "",
        eventNo: true,
    });
    const [completed, setCompleted] = useState(false);
    const [id, setId] = useState("");
    const [buttonCheck, setButtoncheck] = useState(false);
    const checkMgender = () => {
        setNewUser((i) => {
            const test = { ...i, user_gender: "Male" }
            console.log("성별남자", test);
            return test;
        });
    }

    const checkFgender = () => {
        setNewUser((i) => {
            const test = { ...i, user_gender: "Female" }
            console.log("성별여자", test);
            return test;
        });
    };

    const checkDouble = () => {
        console.log("id: ", id);

        for (let i of users) {
            if (i.id === id) {
                console.log(i.id);
                alert("이미 존재하는 아이디입니다.");
                setId("");
                return;
            }
        }
        alert("사용 가능한 아이디입니다.");
        setButtoncheck(true);
        console.log(buttonCheck);
    };

    const checkEventNo = () => {
        alert("이벤트 메일 수신을 거절하였습니다");
        setNewUser((i) => {
            const test = { ...i, eventNo: !i.eventNo }
            console.log("이벤트 수신 거절", test);
            return test;
        });
    };

    const changeHandler = (e) => {
        const { value, id } = e.target;
        console.log("value:", value, "id:", id);
        setNewUser((i) => ({ ...i, [id]: value }));
        console.log("newUser", newUser);
    };

    const finishSignup = (e) => {
        e.preventDefault();
        const totalForm = e.target;

        if (totalForm.checkValidity() && buttonCheck == true) {
            // 폼의 모든 입력 요소들에 대해 검증 수행
            alert("회원가입이 완료되었습니다");
            setCompleted(true);
            setUsers((i) => [...i, newUser]);
            console.log("Users", users);
        } else {
            alert("모든 필드를 올바르게 작성해주세요.");
        }
    };

      return {
        users,
        setUsers,
        newUser,
        setNewUser,
        completed,
        setCompleted,
        id,
        setId,
        buttonCheck,
        setButtoncheck,
        checkMgender,
        checkFgender,
        checkDouble,
        checkEventNo,
        changeHandler,
        finishSignup,
    };
}

export default SignUpApi