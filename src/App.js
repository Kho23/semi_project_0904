import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import Footer from "./pages/Footer";
import NavVar from "./components/NavVar";
import FAQPage from "./pages/FAQPage";
import InqueryPage from "./pages/InqueryPage";
import Oneonone_inquery from "./components/Oneononeinquery";
import InqueryDetailPage from "./pages/InqueryDetailPage";
import StorePage from "./pages/StorePage";
import RegisterList from "./pages/RegisterList";
import { useState } from "react";
import { infoContext } from "./api/ContextApi";
import MyPage from "./pages/MyPage";
import ReservationPage from "./pages/ReservationPage";
import SeatPage from "./pages/SeatPage";
import PurchsePage from "./pages/PurchsePage";
import MyreservationPage from "./pages/MyreservationPage";
import ChangeInfo from "./pages/ChangeInfo";
import SignUp from "./components/register/SignUp";

function App() {
  const forSet = JSON.parse(localStorage.getItem("loginUser")) || null;
  // JSON.parse: 문자열 → 객체/배열(꺼낼 때)
  // localStorage에서 로그인 사용자 정보 가져오고 값이 없으면 null 반환
  console.log("loginUser", forSet);

  const [user, setUser] = useState(forSet); // 로그인 사용자 상태 관리

  return (
    <>
      <infoContext.Provider value={{ user, setUser }}>
        {/* ==========================
          Context Provider
          - user: 로그인 사용자 정보
          - setUser: 로그인 상태 업데이트 함수
          - App 전체에서 접근 가능
      ========================== */}

        <BrowserRouter> 
        {/* ==========================
            라우터 설정
            BrowserRouter: SPA 라우팅
        ========================== */}

          <NavVar /> {/* 네비게이션 바 */}

          <Routes>  {/* 페이지 라우팅 */}
            <Route path="/" element={<MainPage />} /> {/* 메인 페이지 */}
            <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
            <Route path="/FAQ" element={<FAQPage />} /> {/* FAQ 페이지 */}
            <Route path="/inquerylist" element={<InqueryPage />} /> {/* 1:1 문의 리스트 */}
            <Route path="/inquery" element={<Oneonone_inquery />} /> {/* 1:1 문의 작성 */}
            <Route
              path="/inquerylist/inquery/:inqueryId"  
              element={<InqueryDetailPage />}   
            /> {/* 문의 상세 */}
            <Route path="/store" element={<StorePage />} /> {/* 스토어 페이지 */}
            <Route path="/registerList" element={<RegisterList />} /> {/* 회원가입 단계별 리스트 */}
            <Route path="/myPage" element={<MyPage />} /> {/* 마이페이지 */}
            <Route path="/myPage/ChangeInfo" element={<ChangeInfo />} /> {/* 개인정보 수정 */}
            <Route path="/reservation" element={<ReservationPage />} /> {/* 예매 페이지 */}
            <Route path="/seat" element={<SeatPage />} /> {/* 좌석 선택 페이지 */}
            <Route path="/purchase" element={<PurchsePage />} /> {/* 결제 페이지 */}
            <Route path="/myPage/reservation" element={<MyreservationPage />} /> {/* 마이페이지 예매 내역 */}
          </Routes>

          {/* 하단 푸터 */}
          <Footer />
        </BrowserRouter>
      </infoContext.Provider>
    </>
  );
}

export default App;
