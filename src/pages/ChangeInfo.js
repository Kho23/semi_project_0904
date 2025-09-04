import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import ChangeInfoApi from "../api/ChangeInfoApi";


const ChangeInfo = () => {
  const { editInfoPassword, editInfoBirth } = ChangeInfoApi();
  const [loginUser, setloginUser] = useState({});

  useEffect(() => {
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    setloginUser(forSet);
  }, []);

  return (
    <div>
      <ul>
        <li>
          <div>
            이름
            <input
              type="text"
              id="changeName"
              value={loginUser.user_lastname + loginUser.user_firstname}
              readOnly
            />
          </div>
        </li>
        <li>
          <div>
            아이디
            <input
              type="text"
              id="changeId"
              value={loginUser.user_id}
              readOnly
            />
          </div>
        </li>
        <li>
          <div>
            비밀번호
            <input
              type="password"
              id="changePassword"
              value={loginUser.user_password}
              readOnly
            />
          </div>
          <i onClick={editInfoPassword}>
            <FiEdit3 />
          </i>
        </li>
        <li>
          <div>
            생년월일
            <input
              type="text"
              id="changeBirth"
              value={loginUser.user_birth}
              readOnly
            />
          </div>
          <i onClick={editInfoBirth}>
            <FiEdit3 />
          </i>
        </li>
        <li>
          <div>
            이메일
            <input
              type="email"
              id="changeEmail"
              placeholder={loginUser.user_email}
              required
            />
          </div>
        </li>
        <li>
          <div>
            전화번호
            <input
              type="tel"
              id="changeTelephone"
              placeholder={loginUser.user_telephone}
              required
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ChangeInfo;
