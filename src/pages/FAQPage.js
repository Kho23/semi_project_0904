import React from "react";
import { FAQDatas } from "../api/FAQDatas";
import FAQItem from "../components/FAQItem";
import '../css/FAQPage.css'; // CSS 파일 import

const FAQPage = () => {
  const faqData = FAQDatas;
  return (
    <div className="faq-page-container">
      <div className="faq-content-wrapper">
        <h3 className="faq-page-title">
          자주 묻는 질문
        </h3>
        
        <div className="faq-list">
          {faqData.map((faq) => (
            <FAQItem 
              key={faq.id}
              answer={faq.answer} 
              question={faq.question} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;