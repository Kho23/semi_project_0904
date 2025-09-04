import React from "react";
import { FAQDatas } from "../api/FAQDatas";
import FAQItem from "../components/FAQItem";

const FAQPage = () => {
  const faqData = FAQDatas;
  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-bold text-center mb-8 text-white text-3xl sm:text-4xl">
          자주 묻는 질문
        </h3>
        
        <div className="bg-slate-800 rounded-lg shadow-md">
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