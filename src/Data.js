import React, { useEffect, useState } from "react";
import {
  countArea,
  parkableTest,
  setParkInfo
} from "./api/DataApi";

const Data = () => {

  const [currentTime, setCurrentTime] = useState("");
  const [parkingTypes, setPakingTypes] = useState([{}])
  // 2. useEffect를 사용해 타이머를 컴포넌트가 처음 생성될 때 딱 한 번만 실행합니다.
  useEffect(() => {
    // 'now' 함수는 그대로 사용합니다.
    setPakingTypes(setParkInfo())
    const now = () => {
      const time = new Date();
      // padStart(2, '0')를 추가하여 항상 두 자리 숫자로 표시 (예: 01, 02)
      const hour = time.getHours().toString().padStart(2, '0');
      const minute = time.getMinutes().toString().padStart(2, '0');
      const second = time.getSeconds().toString().padStart(2, '0');

      // DOM을 직접 조작하는 대신, state를 업데이트합니다.
      setCurrentTime(`${hour}:${minute}:${second}`);
      console.log("시간가는중");
    };

    // 1초마다 now 함수를 실행하는 인터벌을 설정합니다.
    const intervalId = setInterval(now, 1000);

    // 3. 컴포넌트가 사라질 때 인터벌을 정리(clean up)합니다. (메모리 누수 방지)
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 빈 배열[]:
  return (
    <>
      <div className="flex min-h-screen bg-gray-100 font-sans">

        {/* ======================= 사이드바 (왼쪽) ======================= */}
        <aside className="w-64 bg-white p-6 shadow-lg flex-shrink-0">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            주차 현황
          </h2>

          {/* 주차 타입 목록 */}
          <ul className="space-y-3">
            {/* 일반석 */}
            <li className="flex justify-between items-center text-lg p-4 rounded-md hover:bg-gray-50">
              <span className="text-gray-700 font-extrabold">일반</span>
              <span className="font-extrabold text-blue-600">
                {countArea(parkingTypes).일반}석
              </span>
            </li>

            {/* 임산부석 */}
            <li className="flex justify-between items-center text-lg p-4 rounded-md hover:bg-gray-50">
              <span className="text-gray-700 font-extrabold">임산부석</span>
              <span className="font-extrabold text-purple-600">
                {countArea(parkingTypes).임산부석}석
              </span>
            </li>

            {/* 장애인석 */}
            <li className="flex justify-between items-center text-lg p-4 rounded-md hover:bg-gray-50">
              <span className="text-gray-700 font-extrabold">장애인석</span>
              <span className="font-extrabold text-red-600">
                {countArea(parkingTypes).장애인석}석
              </span>
            </li>

            {/* 전기차 */}
            <li className="flex justify-between items-center text-lg p-4 rounded-md hover:bg-gray-50">
              <span className="text-gray-700 font-extrabold">전기차</span>
              <span className="font-extrabold text-green-600">
                {countArea(parkingTypes).전기차}석
              </span>
            </li>

            {/* 경차 */}
            <li className="flex justify-between items-center text-lg p-4 rounded-md hover:bg-gray-50">
              <span className="text-gray-700 font-extrabold">경차</span>
              <span className="font-extrabold text-yellow-600">
                {countArea(parkingTypes).경차}석
              </span>
            </li>
          </ul>
          <span id="clock" className="text-xl font-semibold text-gray-700 mt-4 block text-center">
            {currentTime}
          </span>

        </aside>

        {/* ===================== 메인 콘텐츠 (오른쪽) ===================== */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            전체 주차 공간 목록
          </h1>

          {/* 주차 공간 리스트 (기존 map 함수 적용) */}
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {parkingTypes.map((spot) => (
              <div
                key={spot.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <span className="font-semibold text-gray-800 block text-center">{`[${spot.sector} 구역]`}</span>
                <span className="font-semibold text-gray-800 block text-center">{`${spot.id}`}</span>
                <span className="block text-center mt-2">{parkableTest(spot.parkable)}</span>
                <span className="block text-center text-sm text-gray-600 mt-1">
                  ({spot.type})
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Data;
