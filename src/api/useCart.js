import { useState } from "react";
import { products } from "./StoreData";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const [productData] = useState(products); // 스토어 상품 더미데이터 가져와서 productData 초기값으로 설정
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    try {
      // 현재 로그인한 유저와 전체 유저 정보를 가져옴
      const currentUser = JSON.parse(localStorage.getItem("loginUser")); //현재 로그인중인 유저 정보
      const allUsers = JSON.parse(localStorage.getItem("storageinfo")); // 전체 유저 정보

      if (currentUser && allUsers) { //위 두개가 존재한다면 
        const savedCart = allUsers.find( //전체 유저 정보에서 현재 유저 정보를 찾아서 카트만 꺼냄
          (user) => user.user_id === currentUser.user_id
        )?.cart;
        return savedCart || []; // 장바구니 반환 장바구니에 담긴 제품이 없으면 빈 장바구니 반환
      }
    } catch (error) { //에러 잡힌 경우 실행
      console.error("장바구니 로딩 중 오류 발생:", error);
    }
    return []; // 로그인 정보가 없거나 오류 발생 시 빈 배열로 시작
  }); //카트를 현재 로그인된 유저의 카트 정보로 설정해준다.

  const handleAddToCart = (productId) => {
    //장바구니 담기 버튼 클릭하면 실행되는 함수 버튼 눌린 객체의 id 를 받아옴
    const product = productData.find((p) => p.id === productId); // 상품중에 인자로 받은 id 와 동일 id 를 가진 상품 1개
    if (!product) return; //일치하는 id 없을때 예외 처리
    setCart((prev) => {
      //장바구니 설정 prev는 마지막으로 업데이트된 장바구니 배열
      const exist = prev.find((i) => i.id === productId); //정바구니에서 인자로 받은 id 와 동일 id 가진 제품을 exist 에 담음
      if (exist) {
        //장바구니에 담기 누른 제품이 이미 있을때
        return prev.map(
          (
            i //장바구니를 순회하면서 동일 id 제품 객체를 펼처 수량 1 증가시킴
          ) => (i.id === productId ? { ...i, quantity: i.quantity + 1 } : i)
        );
      }
      return [...prev, { ...product, quantity: 1 }]; // 장바구니에 없는 제품을 담으면 장바구니 배열에 제품을 새로운 객체로 추가
    });
  };

  const handleDecrease = (productId) => {
    //장바구니에 - 버튼으로 수량 감소시키는 함수
    setCart(
      (
        prev //마지막 업데이트된 장바구니 배열을 가져와서
      ) =>
        prev
          .map(
            (
              i //버튼 눌린 제품 id 를 찾아서 수량을 1 감소시킨다
            ) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
          )
          .filter((i) => i.quantity > 0) // 1에서 -1 해서 수량이 0이 된 제품은 장바구니에서 빼기 위해 넣음
    );
  };

  const handleRemove = (productId) => {
    //장바구니에서 제품 제거 버튼 누르면 실행되는 함수
    setCart((prev) => prev.filter((i) => i.id !== productId)); // 마지막 업데이트된 장바구니 배열에서 인자로 받은 id 제품을 걸러버리고 다시 장바구니에 담음
  };
  const total = cart.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );
  // 상태와 함수들을 객체로 묶어서 반환
  const handlePurchase = () => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    const allUser = JSON.parse(localStorage.getItem("storageinfo")); //모든 유저 정보와 현재 로그인된 유저 정보를 가져옴
    const updatedAllUser=allUser.map((userInfo) => { //모든 유저 정보 담긴 배열에서 현재 로그인 유저 정보를 찾아서
      if (userInfo && userInfo.user_id == user.user_id) {
        return {...userInfo, cart:cart} //존재하면 현재 로그인 유저 정보를 펼처서 장바구니를 보관함
      } else {
        return userInfo && userInfo; 
      }
    });
    localStorage.setItem("storageinfo", JSON.stringify(updatedAllUser)); //로컬스토리지에 현재 로그인 유저의 장바구니가 수정된 전체 유저정보 배열을 담아줌
    alert("장바구니에 저장되었습니다."); //팝업창으로 저장 완료 알림
    navigate("/purchase"); //결제 페이지로 이동
  };

  return {
    cart,
    productData,
    handleAddToCart,
    handleDecrease,
    handleRemove,
    total,
    handlePurchase,
    setCart,
  };
};
