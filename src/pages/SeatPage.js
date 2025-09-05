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
      <div className="people-container">
        {/* 일반 */}
        <div className="people-row">
          <span className="people-label">일반석</span>
          <div className="people-buttons">
            {selectedNum.map((i) => (
              <button
                key={i}
                className={`people-btn ${
                  selectedNormalLimit === Number(i) ? "active" : ""
                }`}
                onClick={() => {
                  const newNormal = Number(i);
                  if (newNormal + selectedDisabledLimit > 8) {
                    alert("총 8명 이하로 선택 가능합니다.");
                    setSelectedNormalLimit(0);
                    setSelectedDisabledLimit(0);
                    return;
                  }
                  if (selectedNormalLimit == i) {
                    setSelectedNormalLimit(0);
                  } else setSelectedNormalLimit(newNormal);
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        {/* 장애인 */}
        <div className="people-row">
          <span className="people-label">장애인석</span>
          <div className="people-buttons">
            {selectedNum.map((i) => (
              <button
                key={i}
                className={`people-btn ${
                  selectedDisabledLimit === Number(i) ? "active" : ""
                }`}
                onClick={() => {
                  const newDisabled = Number(i);
                  if (selectedNormalLimit + newDisabled > 8) {
                    alert("총 8명 이하로 선택 가능합니다.");
                    setSelectedNormalLimit(0);
                    setSelectedDisabledLimit(0);
                    return;
                  }
                  if (selectedDisabledLimit == i) {
                    setSelectedDisabledLimit(0);
                  } else setSelectedDisabledLimit(newDisabled);
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
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

          <button className="red-button" onClick={selectHandler}>
            선택완료
          </button>
        </div>
        {/* 오른쪽: 영화 정보 */}
        <div className="info-card">
          {/* 영화 상세 정보 */}
          <div className="movie-details">
            {/* --- 영화 제목 영역 --- */}
            <div className="movie-title-row">
              <span className="age-rating">15</span>
              <span className="movie-title">{reservationData[0].movie}</span>
            </div>
            <p className="movie-format">2D (자막)</p>

            {/* --- 상세 정보 영역 (그리드) --- */}
            <div className="movie-info-grid">
              <span>영화관</span>
              <span>{reservationData[0].theater}</span>
              <span>날짜</span>
              <span>{reservationData[0].date}</span>
              <span>시간</span>
              <span>{reservationData[0].time}</span>
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
                  ? selectedSeats.map((seat) => <span>{seat}</span>)
                  : // 선택된 좌석이 없을 때 표시할 내용
                    Array.from({ length: 6 }).map((_, index) => (
                      <span key={index}>-</span>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPage;