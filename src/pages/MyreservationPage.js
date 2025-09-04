import React, { useEffect, useState } from "react";

const MyreservationPage = () => {
  const [myReservationData, setMyReservationData] = useState([]);

  useEffect(() => {
    const localloginData = localStorage.getItem("loginUser");
    const localmovieData = localStorage.getItem("myMovieData");

    if (localloginData && localmovieData) {
      const loginData = JSON.parse(localloginData);
      const movieData = JSON.parse(localmovieData);

      const filteredData = movieData.filter(
        (reservation) =>
          reservation[0] && reservation[0].id === loginData.user_id
      );
      setMyReservationData(filteredData);
    }
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          나의 예매 내역
        </h1>

        {myReservationData.length > 0 ? (
          <div className="space-y-6">
            {myReservationData.map((reservationGroup, groupIndex) =>
              reservationGroup.map((reservation, itemIndex) => (
                <div
                  key={`${groupIndex}-${itemIndex}`}
                  className="bg-white rounded-xl shadow-lg border-l-4 border-sky-500 transition-shadow hover:shadow-2xl duration-200"
                >
                  <div className="p-4 pb-4">
                    {/* --- 날짜 및 영화 제목 --- */}
                    <div className="mb-2">
                      <p className="text-base font-bold text-sky-600 mb-1">
                        {reservation.date}
                      </p>
                      <h2 className="text-xl font-bold text-slate-800">
                        {reservation.movie}
                      </h2>
                    </div>
                    {/* --- 구분선 --- */}
                    <hr className="my-3 border-slate-200" />
                    {/* --- 상세 정보 --- */}
                    <div className="space-y-2 text-sm text-slate-700">
                      {/* 상영관 */}
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-slate-500 mr-2 shrink-0 -translate-y-2.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          ></path>
                        </svg>
                        <span className="font-medium text-base text-slate-800">
                          {reservation.theater}
                        </span>
                      </div>
                      {/* 시간 */}
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-slate-500 mr-2 shrink-0 -translate-y-2.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span className="font-medium text-base text-slate-800">
                          {reservation.time}
                        </span>
                      </div>
                      {/* 좌석 */}
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-slate-500 mr-2 shrink-0 -translate-y-2.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5z"
                          ></path>
                        </svg>
                        {reservation.seats &&
                          reservation.seats.map((seat, seatIndex) => (
                            <span
                              key={seatIndex}
                              className="font-mono bg-slate-200 text-slate-800 font-bold py-1 px-3 rounded-md text-sm mr-1"
                            >
                              {seat}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-slate-800">
              예매 내역이 없습니다.
            </h3>
            <p className="mt-1 text-slate-500">
              좋아하는 영화를 예매하고 문화 생활을 즐겨보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyreservationPage;
