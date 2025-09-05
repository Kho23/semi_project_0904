import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const InqueryDetailPage = () => {
  const [inquery, setInquery] = useState(null);
  const { inqueryId } = useParams();

  useEffect(() => {
    const AllInquery = localStorage.getItem("inquiryList");
    if (AllInquery) {
      const inqueryArray = JSON.parse(AllInquery);
      const selectedInquiery = inqueryArray.find(
        (i) => i.id.toString() === inqueryId
      );
      setInquery(selectedInquiery);
    }
  }, [inqueryId]);

  if (!inquery) {
    return (
      <div className="bg-slate-900 min-h-screen text-slate-100 p-8 flex justify-center items-center">
        <p className="text-xl text-slate-400">문의 내용을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        
        <h2 className="text-3xl font-bold text-amber-400 mb-8 border-b-2 border-slate-700 pb-4">
          문의 상세 보기
        </h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">제목</h3>
          <p className="p-4 rounded-lg text-xl text-slate-100 bg-slate-800">
            {inquery.title}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">문의 내용</h3>
          <p className="p-4 rounded-lg text-base text-slate-300 bg-slate-800 min-h-[150px] whitespace-pre-wrap">
            {inquery.content}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">답변</h3>
          <div className="p-4 rounded-lg text-base text-slate-200 bg-slate-800/50 border border-slate-700 min-h-[150px]">
            {inquery.answer ? (
              <p className="whitespace-pre-wrap">{inquery.answer}</p>
            ) : (
              <p className="text-slate-500">아직 답변이 작성되지 않았습니다.</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link to="/inqueryList" className="inline-block text-black bg-slate-300 font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-slate-400 no-underline">
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InqueryDetailPage;