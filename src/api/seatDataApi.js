import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaWheelchair } from "react-icons/fa"; // FaWheelchair를 사용하므로 import 추가

// 필요한 상수와 함수들은 그대로 둡니다.
export const selectedNum = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const rowNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const createSeatData = () => {
  const seatData = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 1; j <= 12; j++) {
      let type = "normal";
      if (i === 0) type = "disabled";
      seatData.push({
        id: `${rowNames[i]}${j}`,
        row: rowNames[i],
        number: j,
        reserved: false,
        type: type,
      });
    }
  }
  return seatData;
};

// 기존 로직을 담은 커스텀 훅
// (React 규칙상 use로 시작하는 것이 좋지만, 기존 이름 그대로 seatApi로 유지)
export const seatApi = () => {
  // searchParams 로직을 훅 내부로 이동 (이것만 수정해야 정상 동작합니다)
  const [searchParams] = useSearchParams();
  const reservationData = {
    date: searchParams.get("date"),
    movie: searchParams.get("movie"),
    theater: searchParams.get("theater"),
    time: searchParams.get("time"),
  };

  // --- 아래는 기존 코드와 100% 동일합니다 ---
  const [seatData, setSeatData] = useState(createSeatData());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedNormalLimit, setSelectedNormalLimit] = useState(0);
  const [selectedDisabledLimit, setSelectedDisabledLimit] = useState(0);

  const clickHandler = (seat) => {
    const { id, type } = seat;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((seatId) => seatId !== id));
      return;
    }
    if (selectedDisabledLimit === 0 && selectedNormalLimit === 0) {
      alert("관람인원을 먼저 선택해 주세요");
      return setSelectedSeats([]);
    }
    if (
      selectedNormalLimit > 0 &&
      selectedDisabledLimit === 0 &&
      type === "disabled"
    ) {
      alert(
        "해당 좌석은 휠체어 전용 좌석으로 일반 고객은 이용하실 수 없습니다."
      );
      return setSelectedSeats([]);
    }
    if (
      selectedDisabledLimit > 0 &&
      selectedNormalLimit === 0 &&
      type === "normal"
    ) {
      alert("일반석은 선택할 수 없습니다.");
      return setSelectedSeats([]);
    }
    const normalCount = selectedSeats.filter(
      (id) => seatData.find((s) => s.id === id).type === "normal"
    ).length;
    if (type === "normal" && normalCount >= selectedNormalLimit) {
      alert(`일반석은 최대 ${selectedNormalLimit}명까지 선택 가능합니다.`);
      return setSelectedSeats([]);
    }
    const disabledCount = selectedSeats.filter(
      (id) => seatData.find((s) => s.id === id).type === "disabled"
    ).length;
    if (type === "disabled" && disabledCount >= selectedDisabledLimit) {
      alert(`장애인석은 최대 ${selectedDisabledLimit}명까지 선택 가능합니다.`);
      return setSelectedSeats([]);
    }
    setSelectedSeats([...selectedSeats, id]);
  };

  const selectHandler = () => {
    if (window.confirm("선택한 좌석으로 예약하시겠습니까?")) {
      const updateData = seatData.map((i) =>
        selectedSeats.includes(i.id) ? { ...i, reserved: true } : i
      );
      setSeatData(updateData);
      localStorage.setItem("reservedData", JSON.stringify(updateData));
      alert("예약이 완료되었습니다");
      setSelectedNormalLimit([]);
      setSelectedDisabledLimit([]);
      setSelectedSeats([]);
    }
  };

 const renderSeatBtn = (seat) => {
  const isSelected = selectedSeats.includes(seat.id);
  const isReserved = seat.reserved;
  const isDisabled = seat.type === "disabled";

  const baseClass = "w-9 h-8 rounded-md text-xs font-bold flex items-center justify-center transition transform shadow-md";
  const defaultClass = isReserved
    ? "bg-gray-700 text-gray-400 cursor-not-allowed shadow-none"
    : isSelected
      ? "bg-red-500 text-white shadow-[0_8px_18px_rgba(239,68,68,0.35)]"
      : "bg-white text-gray-900 hover:bg-green-500 hover:text-white hover:scale-105 hover:-translate-y-[2px]";
  const accessibleClass = isDisabled
    ? "bg-sky-300 outline-dashed outline-2 outline-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.25),0_6px_18px_rgba(59,130,246,0.25)]"
    : "";

  const seatClass = `${baseClass} ${defaultClass} ${accessibleClass}`;

  return (
    <button
      key={seat.id}
      className={seatClass}
      disabled={isReserved}
      onClick={() => clickHandler(seat)}
      title={`${seat.id}${isDisabled ? " (장애인석)" : ""}`}
      aria-label={`${seat.id}${isDisabled ? " (장애인석)" : ""}`}
    >
      {isDisabled ? <FaWheelchair className="text-sm" /> : seat.id}
    </button>
  );
};


  return {
    seatData,
    setSeatData,
    selectedSeats,
    setSelectedSeats,
    selectedNormalLimit,
    setSelectedNormalLimit,
    selectedDisabledLimit,
    setSelectedDisabledLimit,
    reservationData,
    clickHandler,
    selectHandler,
    renderSeatBtn,
  };
};