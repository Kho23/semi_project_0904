import React, { useState } from 'react'

const OneononeinqueryApi = () => {
    const [inquiry, setInquiry] = useState({ title: "", content: "" });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry({ ...inquiry, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!inquiry.title || !inquiry.content) {
          alert("제목과 내용을 모두 입력해주세요.");
          return;
        }
        const existingInquiries = localStorage.getItem("inquiryList");
        const inquiriesArray = existingInquiries ? JSON.parse(existingInquiries) : [];
        const newInquiry = {
          id: Date.now(),
          title: inquiry.title,
          content: inquiry.content,
          answer: null,
        };
        inquiriesArray.unshift(newInquiry);
        localStorage.setItem("inquiryList", JSON.stringify(inquiriesArray));
        alert("등록이 완료되었습니다.");
        setInquiry({ title: "", content: "" });
      };
  return {inquiry,
    setInquiry,
    handleChange,
    handleSubmit,}
}

export default OneononeinqueryApi