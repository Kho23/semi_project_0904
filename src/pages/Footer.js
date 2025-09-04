import React from "react";
import logo3 from "../image/logo3-removebg-preview.png";
import facebook from "../image/facebook.jpg";
import instagram from "../image/instagram.jpg";
import youtube from "../image/youtube.jpg";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <img src={logo3} className="w-48 mb-4" alt="Cinema Logo" />
            <p className="text-xs">
              &copy; {new Date().getFullYear()} GRANDVIEW CINEMA. All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-left text-sm">
            <p>경기도 성남시 분당구 장미로100번길 15-24 302호 | ARS 010-4663-6073</p>
            <p>운영시간 10:00 ~ 22:00 | 대표이메일 wndrn2002@naver.com</p>
            <p className="mt-2">
              <span className="font-semibold text-gray-300">대표자</span> 이건호, 나신영, 전재석
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-semibold mb-3 text-gray-200">Follow Us</p>
            <div className="flex justify-center gap-5">
              <a href="https://www.facebook.com/?locale=ko_KR" className="transition-opacity duration-200 hover:opacity-80">
                <img src={facebook} className="w-8 h-8 rounded-full" alt="Facebook"/>
              </a>
              <a href="https://www.instagram.com/" className="transition-opacity duration-200 hover:opacity-80">
                <img src={instagram} className="w-8 h-8 rounded-full" alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/" className="transition-opacity duration-200 hover:opacity-80">
                <img src={youtube} className="w-8 h-8 rounded-full" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;