import React, { useEffect, useState } from "react";
import MovieInfoApi from "../components/MovieInfo";
import pic1 from "../image/pic1.jpg";
import pic2 from "../image/pic2.jpg";
import pic3 from "../image/pic3.JPG";

const backgroundImages = [pic1, pic2, pic3];

const MainPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
        className="absolute top-0 left-0 right-0 h-full bg-cover bg-center transition-all duration-1000 ease-in-out z-0"
      />
      {/* 블러/반투명 레이어 */}
      <div className="absolute top-0 left-0 right-0 h-full bg-black/70 backdrop-blur-sm z-10" />

      {/* 실제 내용 */}
      {/* 달라진 부분 1: justify-between 제거
        - main과 footer를 위아래 끝으로 보내는 대신, 자연스러운 flex 흐름을 따르도록 합니다.
      */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* 달라진 부분 2: main 태그에 flex 관련 클래스 추가
          - flex-grow: main 영역이 footer를 제외한 모든 남은 공간을 차지하도록 만듭니다.
          - flex items-center justify-center: 차지한 공간 안에서 자식 요소(MovieInfoApi)를 수직/수평 중앙에 배치합니다.
        */}
        <main className="flex-grow flex items-center justify-center p-6">
          <MovieInfoApi />
        </main>
        <footer className="p-4 text-center text-white">
          © 2025 Your Company
        </footer>
      </div>
    </div>
  );
};

export default MainPage;