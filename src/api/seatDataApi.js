import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  const loginUserData = localStorage.getItem("loginUser");

  // --- 아래는 기존 코드와 100% 동일합니다 ---
  const [seatData, setSeatData] = useState(createSeatData());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedNormalLimit, setSelectedNormalLimit] = useState(0);
  const [selectedDisabledLimit, setSelectedDisabledLimit] = useState(0);
  const navigate = useNavigate();
  const clickHandler = (seat) => {
    const { id, type } = seat;
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((seatId) => seatId !== id));
      return;
    }
    if (selectedDisabledLimit === 0 && selectedNormalLimit === 0) {
      alert("관람인원을 먼저 선택해 주세요");
      return;
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
    if (selectedNormalLimit + selectedDisabledLimit != selectedSeats.length) {
      alert(
        "예약 인원 수와 선택한 좌석 수가 다릅니다. 좌석을 모두 선택해주세요."
      );
      setSelectedSeats([]);
    } else {
      if (window.confirm("선택한 좌석으로 예약하시겠습니까?")) {
        //예약 재확인 alert이 뜨고 예를 누르면 예약상태가 바뀌고 그 값을 localStorage에 저장한다.
        const updateData = seatData.map((i) =>
          selectedSeats.includes(i.id) ? { ...i, reserved: true } : i
        );
        setSeatData(updateData);
        localStorage.setItem("reservedData", JSON.stringify(updateData));

        const prevData = JSON.parse(localStorage.getItem("myMovieData")) || [];
        const newData = [...prevData, reservationData];
        localStorage.setItem("myMovieData", JSON.stringify(newData));

        alert("예약이 완료되었습니다");
        navigate("/");
      }
    }
  };

  const reservationData = [
    {
      date: searchParams.get("date"),
      movie: searchParams.get("movie"),
      theater: searchParams.get("theater"),
      time: searchParams.get("time"),
      id: JSON.parse(loginUserData).user_id,
      seats: selectedSeats,
    },
  ];

  const renderSeatBtn = (seat) => {
    const classes = `seat ${
      seat.reserved
        ? "reserved"
        : selectedSeats.includes(seat.id)
        ? "selected"
        : "available"
    } ${seat.type === "disabled" ? "accessible-seat" : ""}`;
    return (
      <button
        key={seat.id}
        className={classes}
        disabled={seat.reserved}
        onClick={() => clickHandler(seat)}
        title={`${seat.id}${seat.type === "disabled" ? " (장애인석)" : ""}`}
        aria-label={`${seat.id}${
          seat.type === "disabled" ? " (장애인석)" : ""
        }`}
      >
        {seat.type === "disabled" ? <FaWheelchair /> : seat.id}
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
