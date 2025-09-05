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

export const seatApi = () => {
  const [searchParams] = useSearchParams();
  //기본 좌석 정보를 담는 useState
  const [seatData, setSeatData] = useState(createSeatData());
  //선택한 좌석정보를 담는 useState
  const [selectedSeats, setSelectedSeats] = useState([]);
  //예매하기 위해 선택한 일반 예약 좌석 수를 담는 useState
  const [selectedNormalLimit, setSelectedNormalLimit] = useState(0);
  //예매하기 위해 선택한 장애인 예약 좌석 수를 담는 useState
  const [selectedDisabledLimit, setSelectedDisabledLimit] = useState(0);
  const navigate = useNavigate();

  //현재 localStorage에 저장된 로그인된 정보를 가져온다.
  const loginUserData = localStorage.getItem("loginUser");

  //좌석 클릭 시 발생하는 Handler
  const clickHandler = (seat) => {
    //선택된 자석의 id와 type을 가져온다.
    const { id, type } = seat;
    //만약 선택한 좌석이 이미 선택된 좌석이라면 그 자리를 제외하고 selectedSeats에 담는다.
    //즉 이미 선택된 좌석을 다시 클릭하면 제외된다.
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((seatId) => seatId !== id));
      return;
    }
    //만약 일반&장애인 예약할 수를 안고르면 alert이 뜬다.
    if (selectedDisabledLimit === 0 && selectedNormalLimit === 0) {
      alert("관람인원을 먼저 선택해 주세요");
      return;
    }
    //만약 일반석만 고르고 장애인석을 고르지 않은 상태에서 장애인석을 고르면 alert이 뜬다.
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
    //만약 장애인석만 고르고 일반석을 고르지 않은 상태에서 일반석을 고르면 alert이 뜬다.
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
