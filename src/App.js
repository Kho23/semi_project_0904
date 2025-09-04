import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import Footer from "./pages/Footer";
import SignUp from "./pages/SignUp";
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

function App() {
  const forSet = JSON.parse(localStorage.getItem("loginUser")) || null;
  // JSON.parse: 문자열 → 객체/배열(꺼낼 때)
  console.log("loginUser", forSet);

  const [user, setUser] = useState(forSet);
  return (
    <>
      <infoContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavVar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/inquerylist" element={<InqueryPage />} />
            <Route path="/inquery" element={<Oneonone_inquery />} />
            <Route
              path="/inquerylist/inquery/:inqueryId"
              element={<InqueryDetailPage />}
            />
            <Route path="/store" element={<StorePage />} />
            <Route path="/registerList" element={<RegisterList />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/seat" element={<SeatPage />} />
            <Route path="/purchase" element={<PurchsePage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </infoContext.Provider>
    </>
  );
}

export default App;
