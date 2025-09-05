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
  const [loginuser, setLoginuser] = useState(""); // 로그인한 사용자 정보 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  useEffect(() => { // 컴포넌트 마운트 시 localStorage에서 로그인 사용자 정보 불러오기
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    console.log(forSet);
    if (forSet) {
      setLoginuser(forSet);
    }
  }, []);

  return (
    <div>
      {/* ==========================
          상단바: MyPage 타이틀 + 아이콘
      =========================== */}
      <div className="mypage">
        <div>MyPage</div>
        <div className="icons">

          {/* 알림 아이콘 */}
          <div>
            <FaRegBell />
          </div>

          {/* 장바구니 아이콘 → 메인 페이지로 링크 */}
          <Link to={"/"}>
            <div>
              <FaShoppingCart />
            </div>
          </Link>

          {/* 고객센터 아이콘 */}
          <div>
            <RiCustomerService2Fill />
          </div>
        </div>
      </div>

      {/* ==========================
          프로필 정보
      =========================== */}
      <div className="profile-container">
        <div className="profile">

          {/* 프로필 아이콘 */}
          <div className="profile_icon">
            <CgProfile />
          </div>

          {/* 사용자 이름 표시 */}
          <div>
            {loginuser.user_lastname}
            {loginuser.user_firstname}님
          </div>
        </div>

         {/* 사용자 ID 표시 */}
        <div className="id">id: {loginuser.user_id}</div>
      </div>

      {/* ==========================
          메뉴 목록
      =========================== */}
      <ul>

        {/* 예매내역 버튼 → /myPage/reservation으로 이동 */}
        <li className="ticket">
          <button onClick={() => navigate("/myPage/reservation")}>
            <i>
              <IoTicketOutline />
            </i>{" "}
            예매내역
          </button>
        </li>

        {/* 주문내역 */}
        <li className="orderList">
          <i>
            <RiFileList3Line />
          </i>{" "}
          주문내역
        </li>

        {/* 문의사항 */}
        <li className="QandA">
          <i>
            <RiQuestionAnswerLine />
          </i>{" "}
          문의사항
        </li>

        {/* 쿠폰 */}
        <li className="coupon">
          <i>
            <RiCoupon2Line />
          </i>{" "}
          쿠폰
        </li>

        {/* 포인트 */}
        <li className="point">
          <i>
            <RiCoinsLine />
          </i>{" "}
          포인트
        </li>

        {/* 개인 정보 변경 → /myPage/ChangeInfo로 이동 */}
        <li className="changeInfo">
          <button onClick={()=>navigate("/myPage/ChangeInfo")}>
          <i><IoSettingsOutline /></i> 개인 정보 변경 </button>
        </li>
      </ul>
    </div>
  );
};

export default MyPage;
