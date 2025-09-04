import React from "react";
import { FAQDatas } from "./api/FAQDatas";

const PageTrain = () => {
  const dummy = FAQDatas;
  const a = [
    { page: 1, size: 10 },
    { page: 2, size: 10 },
    { page: 3, size: 10 },
    { page: 4, size: 10 },
    { page: 5, size: 10 },
  ];
  function getTotalPageCnt(arr,size){
    return Math.ceil(arr.length / size)
  }
  a.map(i=>{
    const totalPageCnt=getTotalPageCnt(a,i.size)
    
  })
  // const getTotalPageCnt = Math.ceil(dummy.length / size); // 필요한 총 페이지 수 계산 14/10 = 1.4 올려서 총 페이지는 2장
  console.log(getTotalPageCnt);

  return <div></div>;
};

export default PageTrain;
