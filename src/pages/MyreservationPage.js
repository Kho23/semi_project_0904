import React, { useEffect, useState } from "react";

const MyreservationPage = () => {
  const [myReservationData, setMyReservationData] = useState([]);
  const localloginData = localStorage.getItem("loginUser");
  const localmovieData = localStorage.getItem("myMovieData");
  const loginData = JSON.parse(localloginData);
  const movieData = JSON.parse(localmovieData);
  console.log(loginData);
  console.log(movieData);

  useEffect(() => {
    setMyReservationData(movieData.filter((i) => i[0].id == loginData.user_id));
  }, []);

  console.log(myReservationData);
  return (
    <div>
      {myReservationData.map((i) =>
        i.map((j) => (
          <div>
            <div>{j.date}</div>
            <div>{j.movie}</div>
            <div>{j.theater}</div>
            <div>{j.time}</div>
            <div>예매한 좌석 : {j.seats}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyreservationPage;
