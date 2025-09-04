import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageApi from "../api/PageApi";
import '../css/InqueryPage.css'; // CSS 파일 import
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
    <div className="inquery-page-container">
      <div className="inquery-content-wrapper">
        <div className="inquery-header">
          <h2 className="inquery-title">문의 목록</h2>
          <button onClick={()=>checkLogin(()=>navigate("/inquery"))} className="write-inquery-button">
            1:1 문의 작성하기
          </button>
        </div>

        <div className="inquery-list-container">
          {currentList.length > 0 ? (
            currentList.map((i) => (
              <Link
                key={i.id}
                to={`/inquerylist/inquery/${i.id}?page=${page}&size=${size}`}
                className="inquery-item-link"
              >
                <div className="inquery-item">
                  <p className="inquery-item-title">
                    제목: {i.title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-inquiries-message">
              <p>작성된 문의가 없습니다.</p>
            </div>
          )}
        </div>

        <div className="pagination-container">
          {prevPage > 0 && (
            <Link
              to={`/inquerylist?page=${prevPage}&size=${size}`}
              className="pagination-button"
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
                className={`pagination-number ${isActive ? 'active' : ''}`}
              >
                {i}
              </Link>
            );
          })}
          
          {nextPage <= getTotalPageCnt && (
            <Link
              to={`/inquerylist?page=${nextPage}&size=${size}`}
              className="pagination-button"
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