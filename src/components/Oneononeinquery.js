import React, { useState } from "react";
import OneononeinqueryApi from "../api/OneononeinqueryApi";

// 컴포넌트 이름은 대문자로 시작하는 것이 좋습니다.
const OneOnOneInquiry = () => {
  const { inquiry,
    setInquiry,
    handleChange,
    handleSubmit, } = OneononeinqueryApi()

  return (
    // 전체 폼을 감싸는 컨테이너
    <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">
        1:1 문의 작성
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력칸 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={inquiry.title}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          />
        </div>

        {/* 내용 입력칸 (textarea로 변경하여 여러 줄 입력 가능) */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="문의하실 내용을 자세히 적어주세요."
            value={inquiry.content}
            onChange={handleChange}
            rows="5"
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition resize-none"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            문의 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default OneOnOneInquiry;