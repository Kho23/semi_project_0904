import React, { useEffect, useState } from "react";
import MovieInfoApi from "../components/MovieInfo";
import pic1 from "../image/pic1.jpg";
import pic2 from "../image/pic2.jpg";
import pic3 from "../image/pic3.JPG";
import '../css/MainPage.css'; // CSS 파일 import

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
        <div className="main-page-container">
            <div
                style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
                className="background-image-slider"
            />
            <div className="background-overlay" />
            
            <div className="main-content-area">
                <MovieInfoApi />
            </div>
        </div>
    );
};

export default MainPage;