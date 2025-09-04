import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { MovieInfoApi } from "../api/MovieInfoApi";
import { movies } from "../api/MovieDataapi";
import { Link } from "react-router-dom";

// '예매하기' 버튼에 추가할 티켓 아이콘 SVG
const TicketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-1.125.65L18 8.614l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5L6 8.614l-1.125 1.437a.75.75 0 01-1.125-.65V6.375zM22.5 12.375v3.026a.75.75 0 01-1.125.65L18 14.614l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5L6 14.614l-1.125 1.437a.75.75 0 01-1.125-.65V12.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875z"
      clipRule="evenodd"
    />
  </svg>
);

const MovieInfo = () => {
  const { handlePrev, handleNext, currentIndex } = MovieInfoApi();
  const imageRef = useRef(null);
  const [imageHeight, setImageHeight] = useState("auto");

  useEffect(() => {
    const interval = setInterval(() => {
      //setInterval로 일정 시간마다 자동으로 넘어가게 해줌
      handleNext(); //메인페이지에 표시된 영화정보에서 다음으로 넘어가게 해주는 함수
    }, 3000); //3초마다 인덱스 1 증가시켜서 다음 영화정보를 보여주게 함
    if (imageRef.current) { //img 태그에 ref={imageRef} 로 되어있어 img 태그를 가져옴
      setImageHeight(imageRef.current.clientHeight);
    }
    return () => clearInterval(interval);
    // 인터벌 클리어로 버그 방지 인덱스 변경마다 인터벌 실행되는에 클리어 안해주면 새로운 타이머가 계속 생겨서 목적과 맞지 않게 실행될수 있음
  }, [currentIndex]); //인덱스 변경될때마다 실행

  const currentMovie = movies[currentIndex]; //3초마다 바뀌는 인덱스에 해당하는 영화를 꺼내 현재 영화정보로 설정

  return (
    <div>
      {" "}
      <div className="absolute inset-0 z-10 pt-20 text-white">
        <div style={{ color: "white" }} className="grid place-items-center">
          <h3 className="text-2xl font-bold text-center mb-4">
            인기영화 Top 3
          </h3>
        </div>

        <div className="relative flex justify-center items-center">
          <div
            key={currentIndex}
            className="flex justify-around p-4 gap-8 fade-in w-full"
          >
            <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-tr from-[#1a1a1a] to-black bg-opacity-40 rounded-xl max-w-4xl mx-auto border border-gray-800 shadow-2xl shadow-black/50">
              <div className="flex gap-8">
                <img
                  ref={imageRef}
                  src={currentMovie.image} //현재 영화 포스터 표시
                  alt={currentMovie.title + " 포스터"}
                  className="w-1/2 object-contain self-start rounded-lg shadow-lg"
                />
                <div
                  className="w-1/2 flex flex-col"
                  style={{ height: imageHeight }}
                >
                  <h3
                    className="text-3xl font-black mb-4 tracking-tight"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                  >
                    {currentMovie.title} 
                    {/* 현재 영화 제목 표시 */}
                  </h3>
                  <div className="flex-1 min-h-0 overflow-y-auto pr-3 text-base">
                    <p
                      className="font-medium leading-relaxed text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: currentMovie.description,
                        //현재 영화 설명 표시
                      }}
                    ></p>
                  </div>
                  {/* --- 💅 유튜브 영상 디자인 변경 --- */}
                  <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentMovie.youtubeId}`} //유튜브 영상 표시
                      title={currentMovie.title + " 예고편"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              {/* --- 💅 예매하기 버튼 디자인 변경 --- */}
              <Link to="/reservation" className="mt-6 w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2">
                <TicketIcon />
                예매하기
              </Link>
            </div>
          </div>

          {/* --- 💅 PREV/NEXT 버튼 디자인 변경 --- */}
          <button
            onClick={handlePrev} //버튼 누르면 인덱스 변경되면서 이전 영화로 감
            className="absolute top-1/2 left-32 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 text-lg font-bold transition-all hover:bg-white/20"
          >
            &lt;
          </button>
          <button
            onClick={handleNext} //버튼 누르면 인덱스 변경되면서 다음 영화로 감
            className="absolute top-1/2 right-32 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 text-lg font-bold transition-all hover:bg-white/20"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
