import { useState } from "react";

export const parkableTest = (i) => {
  console.log(i);
  if (i) return <div style={{ color: "blue" }}>주차 가능</div>;
  else return <div style={{ color: "red" }}>주차 불가</div>;
};
//객체 parkable 이 뭐냐에 따라 다른 태그 데이터를 반환
export function generateCarNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = Math.floor(1000 + Math.random() * 9000); // 1000~9999
  const chars =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  return numbers.toString() + chars;
}
//랜덤 차량번호 부여 함수

export function randomBoolean() {
  return Math.random() < 0.5;
}
//주차가능 여부 랜덤설정

export const countArea = (arr) => {
  return arr.reduce(
    (counts, item) => {
      const { type } = item;
      const { parkable } = item;
      if (parkable) {
        counts[type] = (counts[type] || 0) + 1;
      }

      return counts;
    },
    { 일반: 0, 임산부석: 0, 장애인석: 0, 전기차: 0, 경차: 0 }
  );
}
//각 타입별 주차 가능 자리 수 계산

export const setParkInfo = () => {
  const parkingTypes = [];
  for (let i = 1; i <= 100; i++) {
    // sector 결정
    let sector = "";
    if (i <= 20) sector = "A";
    else if (i <= 40) sector = "B";
    else if (i <= 60) sector = "C";
    else if (i <= 80) sector = "D";
    else sector = "E";

    // type 결정
    let type = "일반";
    if (i > 95) type = "장애인석"; // 96~100
    else if (i > 90) type = "임산부석"; // 91~95
    else if (i > 80) type = "경차"; // 81~90
    else if (i > 70) type = "전기차"; // 71~80

    parkingTypes.push({
      id: i,
      sector: sector,
      type: type,
      carNumber: generateCarNumber(),
      parkable: randomBoolean(),
    });
  };
  return parkingTypes
}
export const now = () => {
  const [currentTime, setCurrentTime] = useState("");
  const time = new Date();
  // padStart(2, '0')를 추가하여 항상 두 자리 숫자로 표시 (예: 01, 02)
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');
  const second = time.getSeconds().toString().padStart(2, '0');

  // DOM을 직접 조작하는 대신, state를 업데이트합니다.
  setCurrentTime(`${hour}:${minute}:${second}`);
  console.log("시간가는중");
  // 1초마다 now 함수를 실행하는 인터벌을 설정합니다.
  const intervalId = setInterval(now, 1000);

  // 3. 컴포넌트가 사라질 때 인터벌을 정리(clean up)합니다. (메모리 누수 방지)
  return () => {
    clearInterval(intervalId);
  };
};





