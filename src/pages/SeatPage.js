import React, { useEffect, useState } from "react";
import "../css/SeatPage.css";

import {
  createSeatData,
  rowNames,
  searchParams,
  seatApi,
  selectedNum,
} from "../api/seatDataApi";
import { FaWheelchair } from "react-icons/fa";
import { Link } from "react-router-dom";

const SeatPage = () => {
  const {
    seatData, setSeatData, selectedSeats, setSelectedSeats, selectedNormalLimit,
    setSelectedNormalLimit, selectedDisabledLimit, setSelectedDisabledLimit,
    reservationData, clickHandler, selectHandler, renderSeatBtn
  } = seatApi()
  useEffect(() => {
    //localStorage에 저장한 값을 불러와 seatData에 담는다. 저장한 값이 없으면 기본데이터를 담는다.
    const savedData = localStorage.getItem("reservedData");
    savedData ? setSeatData(JSON.parse(savedData)) : setSeatData(seatData);
  }, []);

  return (
    <div>
      {/* 인원 선택 */}
      <div className="people-container">
        {/* 일반 */}
        <div className="people-row">
          <span className="people-label">일반석</span>
          <div className="people-buttons">
            {selectedNum.map((i) => (
              <button
                key={i}
                className={`people-btn ${selectedNormalLimit === Number(i) ? "active" : ""
                  }`}
                onClick={() => {
                  const newNormal = Number(i);
                  if (newNormal + selectedDisabledLimit > 8) {
                    alert("총 8명 이하로 선택 가능합니다.");
                    setSelectedNormalLimit(0);
                    setSelectedDisabledLimit(0);
                    return;
                  }
                  setSelectedNormalLimit(newNormal);
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
                className={`people-btn ${selectedDisabledLimit === Number(i) ? "active" : ""
                  }`}
                onClick={() => {
                  const newDisabled = Number(i);
                  if (selectedNormalLimit + newDisabled > 8) {
                    alert("총 8명 이하로 선택 가능합니다.");
                    setSelectedNormalLimit(0);
                    setSelectedDisabledLimit(0);
                    return;
                  }
                  setSelectedDisabledLimit(newDisabled);
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="seat-container">
        {/* 왼쪽: 스크린 + 좌석 */}
        <div className="seat-left">
          <div className="screen">screen</div>
          <div className="seat-map">
            {rowNames.map((row) => (
              <div key={row} className="seat-row">
                <div className="seat-section">
                  {seatData
                    .filter(
                      (seat) =>
                        seat.row === row && seat.number >= 1 && seat.number <= 4
                    )
                    .map(renderSeatBtn)}
                </div>
                <div className="seat-section">
                  {seatData
                    .filter(
                      (seat) =>
                        seat.row === row && seat.number >= 5 && seat.number <= 8
                    )
                    .map(renderSeatBtn)}
                </div>
                <div className="seat-section">
                  {seatData
                    .filter(
                      (seat) =>
                        seat.row === row &&
                        seat.number >= 9 &&
                        seat.number <= 12
                    )
                    .map(renderSeatBtn)}
                </div>
              </div>
            ))}
          </div>

          {/* 범례 */}
          <div className="legend">
            <div className="legend-item">
              <span className="legend-dot available" /> 선택 가능
            </div>
            <div className="legend-item">
              <span className="legend-dot selected" /> 선택됨
            </div>
            <div className="legend-item">
              <span className="legend-dot reserved" /> 예매 완료
            </div>
            <div className="legend-item">
              <span className="legend-icon">
                <FaWheelchair />
              </span>{" "}
              장애인석
            </div>
          </div>

          <Link to="/" onClick={selectHandler}>
            선택완료
          </Link>
        </div>
        {/* 오른쪽: 영화 정보 */}
        <div className="info-card">
          {/* 영화 상세 정보 */}
          <div className="movie-details">
            {/* --- 영화 제목 영역 --- */}
            <div className="movie-title-row">
              <span className="age-rating">15</span>
              <span className="movie-title">{reservationData.movie}</span>
            </div>
            <p className="movie-format">2D (자막)</p>

            {/* --- 상세 정보 영역 (그리드) --- */}
            <div className="movie-info-grid">
              <span>영화관</span>
              <span>{reservationData.theater}</span>
              <span>날짜</span>
              <span>{reservationData.date}</span>
              <span>시간</span>
              <span>{reservationData.time}</span>
            </div>

            {/* --- 선택 좌석 표시 영역 --- */}
            <div className="selected-seats-info">
              <h4>선택 좌석</h4>
              <div className="seats-grid">
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
