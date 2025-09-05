import React from "react";

const PurchasePage = () => {
  // --- 사용자님이 작성하신 로직 (변경 없음) ---
  const allUsers = JSON.parse(localStorage.getItem("storageinfo")) || [];
  const currentUser = JSON.parse(localStorage.getItem("loginUser"));
  console.log(allUsers);
  console.log(currentUser);

  const cartItem = allUsers.find(
    (userInfo) => userInfo.user_id === currentUser.user_id
  ).cart;

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    // --- 전체 페이지 스타일링 ---
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-8 flex justify-center items-center">
      
      {/* --- 콘텐츠 컨테이너 --- */}
      <div className="w-full max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8">
        
        {/* --- 헤더 --- */}
        <h1 className="text-3xl font-bold text-center text-amber-400 mb-6 border-b border-slate-700 pb-4">
          주문 결제
        </h1>

        {/* --- 장바구니 목록 --- */}
        <div className="divide-y divide-slate-700">
          {cartItem.map((i) => (
            // --- 개별 상품 아이템 ---
            <div key={i.user_id} className="flex justify-between items-center py-4">
              <div>
                <div className="font-semibold text-lg">제품명: {i.name}</div>
                <div className="text-sm text-slate-400">수량: {i.quantity}</div>
                <div className="text-sm text-slate-400">개당 가격: {i.price}원</div>
              </div>
              <div className="font-medium text-lg text-right">
                {i.price * i.quantity}원
              </div>
            </div>
          ))}
        </div>

        {/* --- 총 결제 금액 --- */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center text-xl font-bold">
          <span>총 결제 비용:</span>
          <span className="text-2xl text-amber-400">{totalPrice}원</span>
        </div>
        
        {/* --- 결제하기 버튼 --- */}
        <button className="w-full mt-8 p-4 bg-amber-500 text-slate-900 font-bold text-lg rounded-lg transition-colors duration-200 hover:bg-amber-600">
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PurchasePage;