import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { RiCoupon2Line } from "react-icons/ri";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { RiFileList3Line, RiCoinsLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const MyPage = () => {
  const [loginuser, setLoginuser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    console.log(forSet);
    if (forSet) {
      setLoginuser(forSet);
    }
  }, []);

  return (
    <div>
      <div className="mypage">
        <div>MyPage</div>
        <div className="icons">
          <div>
            <FaRegBell />
          </div>
          <Link to={"/"}>
            <div>
              <FaShoppingCart />
            </div>
          </Link>
          <div>
            <RiCustomerService2Fill />
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile">
          <div className="profile_icon">
            <CgProfile />
          </div>
          <div>
            {loginuser.user_lastname}
            {loginuser.user_firstname}님
          </div>
        </div>
        <div className="id">id: {loginuser.user_id}</div>
      </div>

      <ul>
        <li className="ticket">
          <button onClick={() => navigate("/myPage/reservation")}>
            <i>
              <IoTicketOutline />
            </i>{" "}
            예매내역
          </button>
        </li>
        <li className="orderList">
          <i>
            <RiFileList3Line />
          </i>{" "}
          주문내역
        </li>
        <li className="QandA">
          <i>
            <RiQuestionAnswerLine />
          </i>{" "}
          문의사항
        </li>
        <li className="coupon">
          <i>
            <RiCoupon2Line />
          </i>{" "}
          쿠폰
        </li>
        <li className="point">
          <i>
            <RiCoinsLine />
          </i>{" "}
          포인트
        </li>
        <li className="changeInfo">
          <button onClick={()=>navigate("/myPage/ChangeInfo")}>
          <i><IoSettingsOutline /></i> 개인 정보 변경 </button>
        </li>
      </ul>
    </div>
  );
};

export default MyPage;
