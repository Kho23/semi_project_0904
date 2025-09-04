import React, { useEffect, useState } from 'react';
import { IoSettingsOutline, IoTicketOutline } from "react-icons/io5";
import { FaRegBell, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiCustomerService2Fill, RiCoupon2Line, RiQuestionAnswerLine, RiFileList3Line, RiCoinsLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const MyPage = () => {
  const [loginuser, setLoginuser] = useState("");

  useEffect(() => {
    const forSet = JSON.parse(localStorage.getItem("loginUser"));
    console.log(forSet);
    if(forSet) {
      setLoginuser(forSet);
    }
  }, []);
  
  return (
    <div className="font-sans">
      <div className="flex justify-between items-center p-5 bg-gray-100 text-black mb-5"> 
        <div className="text-2xl font-bold text-black">MyPage</div> 
        <div className="flex gap-5 text-3xl"> 
          <div className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500 transform hover:scale-110"><FaRegBell /></div> 
          <Link to={"/"}><div className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500 transform hover:scale-110"><FaShoppingCart /></div></Link>
          <div className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500 transform hover:scale-110"><RiCustomerService2Fill /></div> 
        </div>
      </div>

      <div className="flex items-center gap-2.5"> 
        <div className="flex items-center gap-2.5">
          <div className="text-4xl text-blue-500 -translate-y-2.5 translate-x-2.5"><CgProfile /></div>
          <div className="text-xl font-bold text-gray-800">{loginuser.user_lastname}{loginuser.user_firstname}님</div>
        </div>
        <div className="text-sm text-gray-600 mt-12 -ml-2 font-['Roboto',_sans-serif] tracking-wider">id: {loginuser.user_id}</div>
      </div>

      <ul className="list-none p-0 text-lg m-0">
        {[
          { icon: <IoTicketOutline />, text: "예매내역" },
          { icon: <RiFileList3Line />, text: "주문내역" },
          { icon: <RiQuestionAnswerLine />, text: "문의사항" },
          { icon: <RiCoupon2Line />, text: "쿠폰" },
          { icon: <RiCoinsLine />, text: "포인트" },
          { icon: <IoSettingsOutline />, text: "개인정보 변경" },
        ].map((item, index) => (
          <li key={index} className="py-2.5 ml-12 text-left cursor-pointer transition-all duration-300 ease-in-out flex items-center hover:bg-gray-200 hover:text-blue-500 rounded-md hover:scale-105">
            <i className="mr-4 text-2xl align-middle text-black">{item.icon}</i>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyPage;