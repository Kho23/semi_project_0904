import React, { useEffect } from "react";
import { rowNames } from "../api/seatDataApi";
import { FaWheelchair } from "react-icons/fa";
import { Link } from "react-router-dom";
import { seatApi } from "../api/seatDataApi"; // seatApi import

const SeatPage = () => {
  const {
    seatData, setSeatData, selectedSeats, selectedNormalLimit,
    setSelectedNormalLimit, selectedDisabledLimit, setSelectedDisabledLimit,
    reservationData, renderSeatBtn, selectHandler
  } = seatApi();

  useEffect(() => {
    const savedData = localStorage.getItem("reservedData");
    savedData ? setSeatData(JSON.parse(savedData)) : setSeatData(seatData);
  }, []);

  const selectedNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="font-sans text-white py-7 px-5 bg-[radial-gradient(80%_100%_at_50%_0%,#2b2a40_0%,#1f1e2e_80%)]">
      {/* 인원 선택 */}
      <div className="flex flex-col gap-3.5 my-4 mx-auto max-w-lg">
        {[
          { label: "일반석", limit: selectedNormalLimit, setter: setSelectedNormalLimit, otherLimit: selectedDisabledLimit },
          { label: "장애인석", limit: selectedDisabledLimit, setter: setSelectedDisabledLimit, otherLimit: selectedNormalLimit }
        ].map(({ label, limit, setter, otherLimit }) => (
          <div key={label} className="flex items-center justify-center gap-3.5">
            <span className="w-[70px] text-base font-bold text-gray-200 text-right">{label}</span>
            <div className="flex gap-2 flex-wrap">
              {selectedNum.map((i) => (
                <button
                  key={i}
                  className={`w-10 h-10 border-2 border-slate-700 rounded-lg bg-slate-900 text-gray-200 text-sm font-extrabold cursor-pointer transition-all duration-200 hover:border-gray-400 hover:-translate-y-px ${
                    limit === i ? "border-red-500 text-red-500" : ""
                  }`}
                  onClick={() => {
                    if (i + otherLimit > 8) {
                      alert("총 8명 이하로 선택 가능합니다.");
                      setSelectedNormalLimit(0);
                      setSelectedDisabledLimit(0);
                      return;
                    }
                    setter(i);
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-start gap-7 w-fit mx-auto">
        <div className="flex flex-col items-center w-max">
          <div className="bg-gradient-to-b from-gray-500 to-gray-700 h-16 w-full max-w-2xl mb-6 flex items-center justify-center text-gray-200 text-lg font-semibold tracking-wider rounded-lg shadow-[0_18px_60px_rgba(255,255,255,0.18)] uppercase">
            screen
          </div>
          
          {/* ==================== 👇 여기가 수정된 부분입니다 👇 ==================== */}
          <div className="flex flex-col gap-3.5 w-full max-w-2xl mx-auto">
            {rowNames.map((row) => (
              <div key={row} className="flex justify-center items-center">
                {/* Row 라벨 (A, B, C...) 추가하여 가독성 향상 */}
                <span className="w-8 text-center font-bold text-gray-400">{row}</span>
                
                {/* 통로(aisle)를 위한 gap */}
                <div className="flex flex-grow justify-center gap-8">
                  {[0, 1, 2].map((sectionIndex) => (
                    <div key={sectionIndex} className="flex gap-2">
                      {[...Array(4)].map((_, i) => {
                        const seatNumber = sectionIndex * 4 + i + 1;
                        const seat = seatData.find(s => s.row === row && s.number === seatNumber);

                        if (seat) {
                          return renderSeatBtn(seat);
                        } else {
                          // 데이터 없는 좌석: 레이아웃 유지를 위한 placeholder
                          // 💡 주의: w-8 h-8 은 실제 좌석 버튼 크기에 맞춰주세요.
                          return <div key={`${row}-${seatNumber}`} className="w-8 h-8" />;
                        }
                      })}
                    </div>
                  ))}
                </div>
                {/* 오른쪽 라벨 공간 확보하여 중앙 정렬 유지 */}
                <span className="w-8"></span>
              </div>
            ))}
          </div>
          {/* ==================== 👆 여기가 수정된 부분입니다 👆 ==================== */}

          <div className="flex justify-center mt-5 gap-4">
            {[
              { label: "선택 가능", color: "bg-white" },
              { label: "선택됨", color: "bg-red-500" },
              { label: "예매 완료", color: "bg-gray-700" },
            ].map(item => (
              <div key={item.label} className="inline-flex items-center gap-2.5 text-sm text-gray-200">
                <span className={`w-4 h-4 rounded-md shadow-md ${item.color}`} /> {item.label}
              </div>
            ))}
            <div className="inline-flex items-center gap-2.5 text-sm text-gray-200">
              <span className="inline-flex items-center justify-center text-blue-400"><FaWheelchair /></span> 장애인석
            </div>
          </div>
          
          <Link to="/" onClick={selectHandler} className="bg-gradient-to-b from-pink-600 to-red-600 text-white py-3 px-5 text-base font-extrabold border-none rounded-lg cursor-pointer mt-6 shadow-[0_10px_24px_rgba(244,63,94,0.35)] hover:brightness-105 hover:-translate-y-px">
            선택완료
          </Link>
        </div>

        <div className="bg-gray-800 text-white p-5 rounded-xl w-80 shadow-lg flex flex-col">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-sm font-bold">15</span>
              <span className="text-xl font-bold text-white">{reservationData.movie}</span>
            </div>
            <p className="text-sm text-gray-400 m-0 mb-4">2D (자막)</p>
            <div className="grid grid-cols-[60px_1fr] gap-2 text-base text-gray-300 border-b border-gray-600 pb-4 mb-4">
              <span className="font-medium text-gray-400">영화관</span><span>{reservationData.theater}</span>
              <span className="font-medium text-gray-400">날짜</span><span>{reservationData.date}</span>
              <span className="font-medium text-gray-400">시간</span><span>{reservationData.time}</span>
            </div>
            <div>
              <h4 className="mt-0 mb-3 text-base font-semibold text-white">선택 좌석</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedSeats.length > 0
                  ? selectedSeats.map((seat, index) => <span key={index} className="bg-gray-700 border border-gray-600 rounded-md text-center py-2 font-medium text-gray-200">{seat}</span>)
                  : Array.from({ length: 6 }).map((_, index) => <span key={index} className="bg-gray-700 border border-gray-600 rounded-md text-center py-2 font-medium text-gray-200">-</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPage;