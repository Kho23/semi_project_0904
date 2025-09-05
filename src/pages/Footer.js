import React from "react";
import logo3 from "../image/semicolonlogo_1.png";
import facebook from "../image/facebook.jpg";
import instagram from "../image/instagram.jpg";
import youtube from "../image/youtube.jpg";
import '../css/Footer.css'; // CSS 파일 import

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content-wrapper">
          
          <div className="footer-section logo-section">
            <img src={logo3} className="footer-logo" alt="Cinema Logo" />
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} GRANDVIEW CINEMA. All rights reserved.
            </p>
          </div>

          <div className="footer-section info-section">
            <p>경기도 성남시 분당구 장미로100번길 15-24 302호 | ARS 010-4663-6073</p>
            <p>운영시간 10:00 ~ 22:00 | 대표이메일 wndrn2002@naver.com</p>
            <p className="representatives-info">
              <span className="info-label">대표자</span> 이건호, 나신영, 전재석
            </p>
          </div>

          <div className="footer-section social-section">
            <p className="social-title">Follow Us</p>
            <div className="social-links">
              <a href="https://www.facebook.com/?locale=ko_KR" className="social-link">
                <img src={facebook} className="social-icon" alt="Facebook"/>
              </a>
              <a href="https://www.instagram.com/" className="social-link">
                <img src={instagram} className="social-icon" alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/" className="social-link">
                <img src={youtube} className="social-icon" alt="YouTube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;