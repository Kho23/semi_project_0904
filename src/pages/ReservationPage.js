import { dates, movie } from "../api/movieReservationApi";
import "../css/ReservationPage.css";
import ReservationApi from "../api/ReservationApi";

const ReservationPage = () => {
  const {movieList,theaterList,selectedTheater,setSelectedTheater,
    date,title,setTheater,clickDate,clickTheater,clickTime
  }=ReservationApi();

  return (
    <div className="reservation-page-wrapper">
      <div className="reservation-container">
        <div className="header">
          <div className="tab-buttons">
            <button className="tab active">빠른예매</button>
          </div>
        </div>

        <div className="main-content">
          {/* 날짜 선택 섹션 */}
          <div className="date-selection-panel">
            <div className="date-picker-section">
              <div className="date-list">
                {dates.map((d, index) => (
                  <button
                    key={index}
                    className={`date-button ${
                      date === d.label ? "selected" : ""
                    }`}
                    onClick={() => clickDate(d.label)}
                  >
                    <div className="day">
                      {d.label.split("(")[1].replace(")", "")}
                    </div>
                    <div className="date-number">{d.label.split(" ")[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 영화 목록 */}
          <div className="column movie-list-panel">
            <div className="column-header">
              <h3>영화</h3>
            </div>
            <div className="scroll-area">
              {movieList.length > 0 ? (
                movieList.map((i) => {
                  const { movieName } = i;
                  return movieName.map((movieItem) => (
                    <div
                      key={movieItem.title}
                      className={`movie-item ${
                        title === movieItem.title ? "selected" : ""
                      }`}
                    >
                      <button
                        className="movie-button"
                        onClick={() => {
                          clickTheater(movieItem.title);
                        }}
                      >
                        <span className="rating-badge">ALL</span>
                        {movieItem.title}
                      </button>
                    </div>
                  ));
                })
              ) : (
                <div className="no-data">날짜를 선택해 주세요.</div>
              )}
            </div>
          </div>

          {/* 상영관 목록 */}
          <div className="column theater-list-panel">
            <div className="column-header">
              <h3>상영관</h3>
            </div>
            <div className="scroll-area">
              {theaterList[0]?.theaters?.length > 0 ? (
                theaterList[0].theaters.map((theaterItem) => (
                  <div
                    key={theaterItem.name}
                    className={`theater-item ${
                      selectedTheater?.name === theaterItem.name
                        ? "selected"
                        : ""
                    }`}
                  >
                    <button
                      className="theater-button"
                      onClick={() => {
                        setSelectedTheater(theaterItem);
                        setTheater(theaterItem.name);
                      }}
                    >
                      {theaterItem.name}
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-data">영화 선택 후 상영관을 확인하세요.</div>
              )}
            </div>
          </div>

          {/* 시간 목록 */}
          <div className="column time-list-panel">
            <div className="column-header">
              <h3>시간</h3>
            </div>
            <div className="scroll-area">
              {selectedTheater && selectedTheater.times?.length > 0 ? (
                <div className="time-grid">
                  {selectedTheater.times.map((time, index) => (
                    <button
                      key={index}
                      className="time-button"
                      onClick={() => clickTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="no-data">상영관 선택 후 시간을 확인하세요.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
