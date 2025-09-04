import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../css/InqueryDetailPage.css'; // CSS 파일 import

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
      <div className="inquery-detail-loading-container">
        <p className="inquery-detail-loading-text">문의 내용을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="inquery-detail-page-container">
      <div className="inquery-detail-content-wrapper">
        
        <h2 className="inquery-detail-title">
          문의 상세 보기
        </h2>

        <div className="inquery-detail-section">
          <h3 className="inquery-detail-label">제목</h3>
          <p className="inquery-detail-box title-box">
            {inquery.title}
          </p>
        </div>

        <div className="inquery-detail-section">
          <h3 className="inquery-detail-label">문의 내용</h3>
          <p className="inquery-detail-box content-box">
            {inquery.content}
          </p>
        </div>

        <div className="inquery-detail-section answer-section">
          <h3 className="inquery-detail-label">답변</h3>
          <div className="inquery-detail-box answer-box">
            {inquery.answer ? (
              <p className="answer-text">{inquery.answer}</p>
            ) : (
              <p className="no-answer-text">아직 답변이 작성되지 않았습니다.</p>
            )}
          </div>
        </div>

        <div className="back-button-container">
          <Link to="/inqueryList" className="back-to-list-button">
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InqueryDetailPage;