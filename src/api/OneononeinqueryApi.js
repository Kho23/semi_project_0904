import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const OneononeinqueryApi = () => {
    const [inquiry, setInquiry] = useState({ title: "", content: "" }); // 문의목록 state
    const navigate = useNavigate(); //링크로 연결해주는 navigate
      const handleChange = (e) => { // 제목, 내용에 입력할때마다 실행되는 함수
        const { name, value } = e.target; // 제목과 내용을 이벤트 발생 태그에서 받아옴
        setInquiry({ ...inquiry, [name]: value }); 
        //이벤트 발생한 태그에 입력된 제목:내용을 넣어줌
      };
    
      const handleSubmit = (e) => {  //등록 버튼 클릭 시 실행 함수
        e.preventDefault(); //무한 렌더링 방지
        if (!inquiry.title || !inquiry.content) { //제목, 내용 중 하나라도 작성된게 없으면
          alert("제목과 내용을 모두 입력해주세요."); //팝업 창으로 경고
          return;
        } 
        const existingInquiries = localStorage.getItem("inquiryList");
        // 로컬스토리지에 저장된 문의목록
        const inquiriesArray = existingInquiries ? JSON.parse(existingInquiries) : [];
        // existingInquiries 가 있으면 로컬스토리지 -> 자바스크립트 가능하게 바꿔주고 없으면 빈 배열
        // 오류 방지용 기능
        const newInquiry = { 
          id: Date.now(), // id 는 현재 시간
          title: inquiry.title, 
          content: inquiry.content, //제목, 내용은 handleChange 에서 설정된 제목과 내용
          answer: null, //답변은 없는 상태를 기본으로 설정
        };
        inquiriesArray.unshift(newInquiry);
        //새로 등록된 문의가 문의목록 최상단에 뜨도록 배열 인덱스 조절하고 기존 문의목록 배열에 넣어줌
        localStorage.setItem("inquiryList", JSON.stringify(inquiriesArray)); //로컬스토리지에 JSON 으로 변환 후 넣어줌
        alert("등록이 완료되었습니다.");//팝업창으로 등록 완료 표시
        setInquiry({ title: "", content: "" });//새로운 문의 등록을 위해 비워줌
      };
      const backToInqueryList=(e)=>{ //문의 등록 버튼 클릭 시 문의목록 페이지로 다시 이동
        navigate('/inquerylist')
      }
  return {inquiry,
    setInquiry,
    handleChange,
    handleSubmit,
  backToInqueryList}
}

export default OneononeinqueryApi