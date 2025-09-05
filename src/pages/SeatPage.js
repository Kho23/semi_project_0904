import React, { useEffect } from "react";
import { rowNames } from "../api/seatDataApi";
import { FaWheelchair } from "react-icons/fa";
import { Link } from "react-router-dom";
import { seatApi } from "../api/seatDataApi";

const SeatPage = () => {
  const {
    seatData, setSeatData, selectedSeats, selectedNormalLimit,
    setSelectedNormalLimit, selectedDisabledLimit, setSelectedDisabledLimit,
    reservationData, renderSeatBtn
  } = seatApi();

  useEffect(() => {
    const savedData = localStorage.getItem("reservedData");
    if (savedData) {
      setSeatData(JSON.parse(savedData));
    }
  }, [setSeatData]);

  const selectedNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const handlePersonSelect = (type, value) => {
    const newNormal = type === 'normal' ? value : selectedNormalLimit;
    const newDisabled = type === 'disabled' ? value : selectedDisabledLimit;
    
    if (newNormal + newDisabled > 8) {
      alert("총 8명 이하로 선택 가능합니다.");
      setSelectedNormalLimit(0);
      setSelectedDisabledLimit(0);
      return;
    }
    
    if (type === 'normal') {
      setSelectedNormalLimit(selectedNormalLimit === value ? 0 : value);
    } else {
      setSelectedDisabledLimit(selectedDisabledLimit === value ? 0 : value);
    }
  };

  const renderSeatBtnCustom = (seat) => {
    const isSelected = selectedSeats.includes(`${seat.row}${seat.number}`);
    const isReserved = seat.reserved;
    const isDisabled = seat.disabled;

    let seatClass = "";
    if (isReserved) {
      seatClass = "bg-gray-700 text-gray-400 cursor-not-allowed";
    } else if (isSelected) {
      seatClass = "bg-red-500 text-white shadow-md";
    } else {
      seatClass = "bg-white text-gray-900 border border-gray-300 hover:bg-gray-200 transition-colors duration-150";
    }
    
    const seatStyle = {
      width: '32px',
      height: '32px',
      margin: '1px',
    };

    return (
      <button
        key={`${seat.row}${seat.number}`}
        className={`relative rounded-md text-sm font-semibold flex items-center justify-center ${seatClass}`}
        style={seatStyle}
        onClick={() => !isReserved && renderSeatBtn(seat)}
      >
        {isDisabled && (
          <FaWheelchair className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 ${isReserved ? 'text-gray-500' : ''}`} />
        )}
        {!isDisabled && seat.number}
      </button>
    );
  };

  return (
    <div className="font-sans text-white p-6 bg-[radial-gradient(80%_100%_at_50%_0%,#2b2a40_0%,#1f1e2e_80%)] min-h-screen flex justify-center items-start">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* 좌측: 인원 선택 및 좌석 */}
        <div className="flex flex-col items-center w-full lg:w-3/4">
          {/* 인원 선택 섹션 */}
          <div className="bg-[#242337] p-5 rounded-lg shadow-lg w-full mb-8 flex justify-center flex-wrap gap-x-12 gap-y-4">
            <div className="flex items-center gap-4">
              <span className="people-label min-w-[70px] text-gray-300">일반석</span>
              <div className="flex flex-wrap gap-2">
                {selectedNum.map((i) => (
                  <button
                    key={i}
                    className={`people-btn transition-all duration-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedNormalLimit === i ? "bg-red-500 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-red-400 hover:text-white"
                    }`}
                    onClick={() => handlePersonSelect('normal', i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="people-label min-w-[70px] text-gray-300">장애인석</span>
              <div className="flex flex-wrap gap-2">
                {selectedNum.map((i) => (
                  <button
                    key={i}
                    className={`people-btn transition-all duration-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedDisabledLimit === i ? "bg-red-500 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-red-400 hover:text-white"
                    }`}
                    onClick={() => handlePersonSelect('disabled', i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 스크린 및 좌석 배치도 */}
          <div className="bg-[#242337] p-6 rounded-lg w-full max-w-2xl mb-6">
            <div className="bg-gradient-to-b from-gray-500 to-gray-700 h-16 w-full mb-6 flex items-center justify-center text-gray-200 text-lg font-semibold tracking-wider rounded-lg uppercase">
              screen
            </div>

            <div className="flex flex-col **gap-0** items-center">
              {rowNames.map((row) => (
                <div key={row} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-bold text-gray-400">{row}</span>
                  <div className="flex gap-4"> {/* 통로 간격 */}
                    <div className="flex flex-wrap gap-0"> {/* 1-4번 좌석 */}
                      {[1, 2, 3, 4].map((seatNumber) => {
                        const seat = seatData.find(s => s.row === row && s.number === seatNumber);
                        return seat ? renderSeatBtnCustom(seat) : <div key={`${row}-${seatNumber}`} className="w-8 h-8" />;
                      })}
                    </div>
                    <div className="flex flex-wrap gap-0"> {/* 5-8번 좌석 */}
                      {[5, 6, 7, 8].map((seatNumber) => {
                        const seat = seatData.find(s => s.row === row && s.number === seatNumber);
                        return seat ? renderSeatBtnCustom(seat) : <div key={`${row}-${seatNumber}`} className="w-8 h-8" />;
                      })}
                    </div>
                    <div className="flex flex-wrap gap-0"> {/* 9-12번 좌석 */}
                      {[9, 10, 11, 12].map((seatNumber) => {
                        const seat = seatData.find(s => s.row === row && s.number === seatNumber);
                        return seat ? renderSeatBtnCustom(seat) : <div key={`${row}-${seatNumber}`} className="w-8 h-8" />;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 범례 */}
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
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

          <button className="red-button mt-8 px-10 py-3 rounded-md text-white font-bold text-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#1f1e2e]" onClick={() => alert('선택 완료!')}>
            선택완료
          </button>
        </div>

        {/* 우측: 영화 정보 카드 */}
        <div className="bg-[#242337] p-6 rounded-lg shadow-lg w-full lg:w-1/4 min-w-[300px]">
          <div className="flex flex-col gap-4">
            {/* 영화 제목 및 등급 */}
            <div className="flex items-center gap-2 border-b border-gray-600 pb-4">
              <span className="inline-block px-2 py-1 text-xs font-bold rounded bg-yellow-500 text-white">15</span>
              <span className="text-xl font-bold text-white">{reservationData[0]?.movie}</span>
            </div>

            {/* 상세 정보 */}
            <div className="grid grid-cols-[60px_1fr] gap-2 text-base text-gray-300">
              <span className="font-medium text-gray-400">영화관</span>
              <span>{reservationData[0]?.theater}</span>
              <span className="font-medium text-gray-400">날짜</span>
              <span>{reservationData[0]?.date}</span>
              <span className="font-medium text-gray-400">시간</span>
              <span>{reservationData[0]?.time}</span>
            </div>

            {/* 선택 좌석 */}
            <div>
              <h4 className="mt-4 mb-3 text-base font-semibold text-white">선택 좌석</h4>
              <div className="grid grid-cols-3 gap-2 text-gray-300">
                {selectedSeats.length > 0
                  ? selectedSeats.map((seat, index) => <span key={index}>{seat}</span>)
                  : Array.from({ length: 6 }).map((_, index) => <span key={index}>-</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPage;