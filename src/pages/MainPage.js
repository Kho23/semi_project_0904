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
    <div className="relative z-20 min-h-screen flex flex-col justify-between">
      <main className="p-6">
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