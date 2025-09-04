import React, { useState } from "react";
import { movies } from "../api/MovieDataapi";

export const MovieInfoApi = () => {
  //메인페이지에 표시되는 영화 옆에 prev next 버튼 만들어서 누르면 다음 영화정보로 넘어가도록 하는 함수
  const [currentIndex, setCurrentIndex] = useState(0); // 영화정보 담긴 배열 인덱스
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    //prev 버튼 클릭 시 인덱스를 1 빼서 쓰는데 -1이 되면 오류 발생하기 때문에 방지용으로 사용
  };
  //prev 버튼 클릭 시 이전 영화 정보로 이동가게 함
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };
  //next 버튼 클릭 시 다음 영화 정보로 이동하게 힘
  return { handlePrev, handleNext, currentIndex, movies };
};
