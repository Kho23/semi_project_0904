import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageApi from "../api/PageApi";
import LoginModal from "../components/auth/LoginModal";
import LoginApi from "../api/LoginApi";

const InqueryPage = () => {
  const [inqueryList, setInqueryList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {setLoginuser,checkLogin,modalOpen,toggleModal,navigate}=LoginApi();
    useEffect(() => {
      const forSet = JSON.parse(localStorage.getItem("loginUser"));
      if (forSet) {
        setLoginuser(forSet);
      }
    }, []);
  const {
    page,
    size,
    currentList,
    pageNum,
    prevPage,
    nextPage,
    getTotalPageCnt,
  } = PageApi(inqueryList, searchParams);

  useEffect(() => {
    const savedInquery = localStorage.getItem("inquiryList");
    if (savedInquery) {
      setInqueryList(JSON.parse(savedInquery));
    }
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">문의 목록</h2>
          <button onClick={()=>checkLogin(()=>navigate("/inquery"))} className="text-white bg-red-600 font-bold py-2 px-5 rounded-lg transition-all duration-300 hover:bg-red-700 no-underline">
            1:1 문의 작성하기
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-md">
          {currentList.length > 0 ? (
            currentList.map((i) => (
              <Link
                key={i.id}
                to={`/inquerylist/inquery/${i.id}?page=${page}&size=${size}`}
                className="block no-underline"
              >
                <div className="p-5 border-b border-slate-700 transition-colors duration-200 cursor-pointer hover:bg-slate-700/50 last:border-b-0">
                  <p className="text-lg font-medium text-slate-100">
                    제목: {i.title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400">
              <p>작성된 문의가 없습니다.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-8 gap-2">
          {prevPage > 0 && (
            <Link
              to={`/inquerylist?page=${prevPage}&size=${size}`}
              className="py-2 px-4 rounded-lg transition-colors duration-200 bg-slate-600 text-slate-300 hover:bg-slate-500 no-underline"
            >
              이전
            </Link>
          )}

          {pageNum.map((i) => {
            const isActive = page === i;
            return (
              <Link
                key={i}
                to={`/inquerylist?page=${i}&size=${size}`}
                className={`py-2 px-4 rounded-lg transition-colors duration-200 no-underline ${
                  isActive 
                    ? 'bg-red-600 text-white font-bold' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {i}
              </Link>
            );
          })}
          
          {nextPage <= getTotalPageCnt && (
            <Link
              to={`/inquerylist?page=${nextPage}&size=${size}`}
              className="py-2 px-4 rounded-lg transition-colors duration-200 bg-slate-600 text-slate-300 hover:bg-slate-500 no-underline"
            >
              다음
            </Link>
          )}
        </div>
      </div>
      <LoginModal modal={modalOpen} r={toggleModal} />
    </div>
  );
};

export default InqueryPage;