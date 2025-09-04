import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dates, movie } from "../api/movieReservationApi";

const ReservationApi = () => {
     const [movieList, setMovieList] = useState([]);
  const [theaterList, setTheaterList] = useState([{ title: "", theaters: [] }]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [theater, setTheater] = useState(null);
  const navigate = useNavigate();

  // 날짜 선택 시 해당 영화 List 버튼 생성
  const clickDate = (selectedDate) => {
    setDate(selectedDate);
    setMovieList(movie.filter((i) => i.duedate === selectedDate));
    setTheaterList([{ title: "", theaters: [] }]);
    setSelectedTheater(null);
  };

  // 영화 선택 시 상영하는 영화관(ex.1관 ,2관...) 버튼 생성
  const clickTheater = (selectedTitle) => {
    setTitle(selectedTitle);
    setTheaterList(
      movieList[0].movieName.filter((i) => i.title === selectedTitle)
    );
    setSelectedTheater(null);
  };

  // 시간 클릭시 예약하겠냐는 alert 뜬 후, 예약 홈페이지로 이동
  const clickTime = (time) => {
    if (window.confirm("선택한 시간으로 예약하시겠습니까?")) {
      navigate(
        `/seat?date=${date}&movie=${title}&theater=${theater}&time=${time}`
      );
    }
  };
  return {movieList,setMovieList,theaterList,setTheaterList,selectedTheater,setSelectedTheater,
    date,setDate,title,setTitle,theater,setTheater,navigate,clickDate,clickTheater,clickTime
  }
}

export default ReservationApi