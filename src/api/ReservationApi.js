import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dates, movie } from "../api/movieReservationApi";

const ReservationApi = () => {
  //날짜 선택 시 해당 날짜의 영화 정보를 담는 useState
  const [movieList, setMovieList] = useState([]);
  //영화 선택 시 상영관 정보를 담는 useState
  const [theaterList, setTheaterList] = useState([{ title: "", theaters: [] }]);
  //상영관 선택 시 그 상영관가 상영하는 시간을 담는 useState
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [theater, setTheater] = useState(null);
  const navigate = useNavigate();

  // 날짜 선택 시 해당 영화 List 버튼 생성
  const clickDate = (selectedDate) => {
    setDate(selectedDate); //선택한 날짜를 저장(선택한 영화 정보를 URL 쿼리 파라미터로 전달)
    setMovieList(movie.filter((i) => i.duedate === selectedDate)); //선택한 날짜와 같은 Data만 저장
    setTheaterList([{ title: "", theaters: [] }]); //날짜를 누르면 선택되었던 상영관 / 시간 등을 초기화
    setSelectedTheater(null); //날짜를 누르면 선택되었던 상영관 / 시간 등을 초기화
  };

  // 영화 선택 시 상영하는 영화관(ex.1관 ,2관...) 버튼 생성
  const clickTheater = (selectedTitle) => {
    setTitle(selectedTitle); //선택한 제목을 저장(선택한 영화 정보를 URL 쿼리 파라미터로 전달)
    setTheaterList(
      movieList[0].movieName.filter((i) => i.title === selectedTitle) //선택한 영화제목과 같은 제목이 포함된 Data만 저장
    );
    setSelectedTheater(null);
  };

  // 시간 클릭시 예약하겠냐는 alert 뜬 후, 예약 홈페이지로 이동
  const clickTime = (time) => {
    if (window.confirm("선택한 시간으로 예약하시겠습니까?")) {
      //내가 선택한 날짜, 영화 제목, 상영관 ,상영시간을 URL로 보냄.
      navigate(
        `/seat?date=${date}&movie=${title}&theater=${theater}&time=${time}`
      );
    }
  };
  return {
    movieList,
    setMovieList,
    theaterList,
    setTheaterList,
    selectedTheater,
    setSelectedTheater,
    date,
    setDate,
    title,
    setTitle,
    theater,
    setTheater,
    navigate,
    clickDate,
    clickTheater,
    clickTime,
  };
};

export default ReservationApi;
