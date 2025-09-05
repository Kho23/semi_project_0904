import React, { useEffect } from "react";
import { MovieInfoApi } from "../api/MovieInfoApi";
import { movies } from "../api/MovieDataapi";
import { Link } from "react-router-dom";

// 티켓 아이콘 SVG
const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-1.125.65L18 8.614l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5L6 8.614l-1.125 1.437a.75.75 0 01-1.125-.65V6.375zM22.5 12.375v3.026a.75.75 0 01-1.125.65L18 14.614l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5L6 14.614l-1.125 1.437a.75.75 0 01-1.125-.65V12.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875z" clipRule="evenodd" />
  </svg>
);

const MovieInfo = () => {
  const { handlePrev, handleNext, currentIndex } = MovieInfoApi();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]); 

  const currentMovie = movies[currentIndex];

  return (
    <div className="text-white w-full">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">인기영화 Top 3</h3>
      </div>

      <div className="relative flex justify-center items-center">
        <div key={currentIndex} className="flex justify-around p-4 gap-8 fade-in w-full">
          <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-tr from-[#1a1a1a] to-black bg-opacity-40 rounded-xl max-w-4xl mx-auto border border-gray-800 shadow-2xl shadow-black/50 h-[50rem]">
            <div className="flex flex-col md:flex-row gap-8 h-full min-h-0">
              <img
                src={currentMovie.image}
                alt={currentMovie.title + " 포스터"}
                className="w-full md:w-1/2 object-contain self-center md:self-start rounded-lg shadow-lg"
              />
              <div className="w-full md:w-1/2 flex flex-col">
                <h3 className="text-3xl font-black mb-4 tracking-tight" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                  {currentMovie.title}
                </h3>
                <div className="flex-1 min-h-0 overflow-y-auto pr-3 text-base">
                  <p className="font-medium leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: currentMovie.description }}></p>
                </div>
                <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentMovie.youtubeId}`} title={currentMovie.title + " 예고편"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
            </div>
            <Link to="/reservation" className="mt-6 w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2">
              <TicketIcon />
              예매하기
            </Link>
          </div>
        </div>

        <button onClick={handlePrev} className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 text-lg font-bold transition-all hover:bg-white/20">
          &lt;
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 text-lg font-bold transition-all hover:bg-white/20">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieInfo;