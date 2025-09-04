import React, { useEffect, useState, useContext } from "react";
import "../../css/SignUp.css";
import AcceptTab from "./AcceptTab";

const SignUp = () => {

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
    
  useEffect(() => {
    const storageinfo = JSON.parse(localStorage.getItem("storageinfo")) || [];
    setUsers(storageinfo);
  }, []);

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
      users.find((i) => i.user_id === id) 
      ? (
        alert("이미 존재하는 아이디입니다."),
        setId("")
      ) : (
        alert("사용 가능한 아이디입니다."),
        setButtoncheck(true),
        console.log(buttonCheck)
      )
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

    if (totalForm.checkValidity() && buttonCheck) {
      // 폼의 모든 입력 요소들에 대해 검증 수행
      alert("회원가입이 완료되었습니다");
      setCompleted(true);
      setUsers((i) => {
        const Test = [...i, newUser];
        localStorage.setItem("storageinfo", JSON.stringify(Test)); 
        return Test;
      });
      console.log("Users", users);
    } else if (totalForm.checkValidity() && !buttonCheck) {
      alert("중복확인 버튼을 눌러주세요.");
    } else {
      alert("모든 필드를 올바르게 작성해주세요.");
    }
  };

  if (completed) {
    return <AcceptTab />;
  };

  return (
    <div>
      <form onSubmit={finishSignup}>
        <h1 id="title">회원정보를 입력해 주세요.</h1>
        <ul>
          <li>
            <div className="name-Class">
              <div className="name-Section">
                <label>
                  성<span className="point">*</span>
                </label>
                <input
                  type="text"
                  id="user_lastname"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="name-Section">
                <label>
                  이름<span className="point">*</span>
                </label>
                <input
                  type="text"
                  id="user_firstname"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>
          </li>
          <li>
            <label>
              생년월일<span className="point">*</span>
              <input
                type="text"
                id="user_birth"
                size="20"
                placeholder="YYYYMMDD"
                onChange={changeHandler}
                required
              />
            </label>
          </li>
          <li>
            <label>
              성별 선택<span className="point">*</span>
            </label>
            <div className="gender-Class">
              <label>
                남자
                <input
                  type="radio"
                  name="user_gender"
                  id="user_gender_M"
                  onClick={checkMgender}
                />
                <b></b>
                여자
                <input
                  type="radio"
                  name="user_gender"
                  id="user_gender_F"
                  onClick={checkFgender}
                />
              </label>
            </div>
          </li>
          <li>
            <label>
              아이디<span className="point">*</span>
              <input
                type="text"
                id="user_id"
                size="20"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  changeHandler(e);
                }}
                placeholder="영문, 숫자 조합(8 ~ 12자)"
                required
              />
              <input
                type="button"
                id="doublecheck"
                value="중복확인"
                onClick={checkDouble}
              />
            </label>
          </li>
          <li>
            <label>
              비밀번호<span className="point">*</span>
              <input
                type="password"
                id="user_password"
                size="20"
                onChange={changeHandler}
                required
              />
            </label>
          </li>
          <li>
            <label>
              이메일<span className="point">*</span>
              <input
                type="email"
                id="user_email"
                size="20"
                placeholder="example@domain.com"
                required
                onChange={changeHandler}
              />
            </label>
            <div className="email-options">
              <label>
                혜택 메일 수신 안 함
                <input type="checkbox" id="event_no" onClick={checkEventNo} />
              </label>
            </div>
          </li>
          <li>
            <label>
              휴대폰 번호<span className="point">*</span>
              <input
                type="tel"
                id="user_telephone"
                size="13"
                placeholder="01000000000"
                onChange={changeHandler}
                required
              />
            </label>
          </li>
        </ul>
        <button type="submit" id="signup">
          가입하기
        </button>
        <div id="existAccount">
          이미 있는 계정이라면?
          <button id="findid">계정찾기</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
