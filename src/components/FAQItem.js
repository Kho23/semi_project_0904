import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false); // 답변을 열고 닫는 설정을 위한 state

  return (
    <div className="border-b border-slate-700 last:border-b-0">
      {/* 질문영역(답변 여닫는 버튼 있음) */}
      <button
        onClick={() => setIsOpen(!isOpen)} //답변을 열고 닫는 버튼. 눌리면 false=>true true=>false 가 됨
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
      >
        <h4 className="text-lg font-medium text-slate-100">{question}</h4>
        
        {/* 아이콘: isOpen 상태에 따라 180도 회전 (transition 효과) */}
        <svg
          className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* 답변영역 버튼 누르면 열리고 닫힘 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`} // isOpen 이 true(열림)이면 최대 높이를 설정, false(닫힘)이면 높이를 0으로 해서 숨김
      >
        <div className="p-5 pt-0 text-slate-300">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;