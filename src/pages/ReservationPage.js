import React from "react";
import { dates } from "../api/movieReservationApi";
import ReservationApi from "../api/ReservationApi";

const ReservationPage = () => {
  const {
    movieList,
    theaterList,
    selectedTheater,
    setSelectedTheater,
    date,
    title,
    setTheater,
    clickDate,
    clickTheater,
    clickTime,
  } = ReservationApi();

  return (
    <div className="flex justify-center items-start min-h-screen bg-[radial-gradient(80%_100%_at_50%_0%,#2b2a40_0%,#1f1e2e_80%)] p-5 box-border">
      <div className="flex flex-col w-[1200px] max-w-[95vw] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-start items-center px-5 bg-white border-b border-gray-200">
          <div className="flex">
            <button className="py-4 px-7 border-none bg-transparent cursor-pointer text-lg font-bold text-gray-400 transition-colors duration-300 ease-in-out relative overflow-hidden text-gray-800 border-b-3 border-blue-500">
              빠른예매
            </button>
          </div>
        </div>

        <div className="flex flex-grow border-t border-gray-200">
          {/* 날짜 선택 */}
          <div className="flex flex-col w-[15%] min-w-[120px] max-w-[180px] bg-white border-r border-gray-200 pb-2.5">
            <div className="p-2.5 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 gap-2 w-full">
                {dates.map((d, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center justify-center h-16 border border-gray-200 bg-white cursor-pointer rounded-md transition-all duration-200 ease-in-out shadow-sm hover:bg-gray-100 hover:border-gray-300 hover:shadow-md ${
                      date === d.label
                        ? "border-2 border-blue-500 bg-blue-50 shadow-lg -translate-y-px text-black"
                        : "text-gray-600"
                    }`}
                    onClick={() => clickDate(d.label)}
                  >
                    <div
                      className={`text-xs font-medium mb-0.5 ${
                        date === d.label
                          ? "text-blue-500 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      {d.label.split("(")[1].replace(")", "")}
                    </div>
                    <div
                      className={`text-xl font-bold leading-none ${
                        date === d.label ? "text-black font-extrabold" : ""
                      }`}
                    >
                      {d.label.split(" ")[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 영화, 상영관, 시간 선택 패널 */}
          {[
            // 영화 패널: 나머지 공간 채우도록 flex-grow
            {
              title: "영화",
              className: "flex-grow min-w-[300px]",
              data: movieList,
              render: (i) =>
                i.movieName.map((movieItem) => ({
                  key: movieItem.title,
                  name: movieItem.title,
                  selected: title === movieItem.title,
                  onClick: () => clickTheater(movieItem.title),
                  badge: "ALL",
                })),
            },
            {
              title: "상영관",
              className: "w-[220px] min-w-[220px]",
              data: theaterList[0]?.theaters,
              render: (theaterItem) => [
                {
                  key: theaterItem.name,
                  name: theaterItem.name,
                  selected: selectedTheater?.name === theaterItem.name,
                  onClick: () => {
                    setSelectedTheater(theaterItem);
                    setTheater(theaterItem.name);
                  },
                },
              ],
            },
            {
              title: "시간",
              className: "w-[300px] min-w-[300px]",
              data: selectedTheater?.times,
              isTime: true,
            }, // 시간 패널 폭 넓힘
          ].map((panel, pIdx) => (
            <div
              key={pIdx}
              className={`flex flex-col bg-white ${
                pIdx !== 2 ? "border-r border-gray-200" : ""
              } ${panel.className}`}
            >
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="m-0 text-base font-bold">{panel.title}</h3>
              </div>
              <div className="overflow-y-auto flex-grow p-2.5">
                {panel.data && panel.data.length > 0 ? (
                  panel.isTime ? (
                    // 시간 버튼 세로 리스트
                    panel.data.map((time, index) => (
                      <div key={index} className="border-b border-gray-100">
                        <button
                          className="w-full text-left p-4 border-none bg-none cursor-pointer text-base flex items-center transition-colors duration-200 rounded-md font-medium hover:bg-gray-100 focus:outline-none"
                          onClick={() => clickTime(time)}
                        >
                          <span>{time}</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    panel.data.flatMap(panel.render).map((item) => (
                      <div
                        key={item.key}
                        className={`border-b border-gray-100 ${
                          item.selected
                            ? "bg-blue-50 border-l-4 border-blue-500 -ml-1"
                            : ""
                        }`}
                      >
                        <button
                          className="w-full text-left p-4 border-none bg-none cursor-pointer text-base flex items-center transition-colors duration-200 rounded-md font-medium hover:bg-gray-100 focus:outline-none"
                          onClick={item.onClick}
                        >
                          {item.badge && (
                            <span className="text-xs bg-gray-600 text-white py-0.5 px-1.5 rounded-sm mr-2 font-normal">
                              {item.badge}
                            </span>
                          )}
                          <span
                            className={`${
                              item.selected ? "font-bold text-black" : ""
                            }`}
                          >
                            {item.name}
                          </span>
                        </button>
                      </div>
                    ))
                  )
                ) : (
                  <div className="text-center p-10 text-gray-400 text-sm leading-relaxed">{`
                    ${pIdx === 0 ? "날짜를 선택해 주세요." : ""}
                    ${pIdx === 1 ? "영화 선택 후 상영관을 확인하세요." : ""}
                    ${pIdx === 2 ? "상영관 선택 후 시간을 확인하세요." : ""}
                  `}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
