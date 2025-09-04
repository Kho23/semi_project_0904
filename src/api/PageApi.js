import React from "react";
import { useSearchParams } from "react-router-dom";

const PageApi = (inqueryList, searchParams) => {
  const page = parseInt(searchParams.get("page")) || 1;
  const size = parseInt(searchParams.get("size")) || 10;
  //URL 에서 받아온 데이터에서 page size 를 받음
  // || 을 사용하여 처음 문의목록 입장 시 1페이지에 10개 데이터를 보여주도록 설정

  const totalCnt = inqueryList.length;
  //문의목록 총 수량
  const getTotalPageCnt = Math.ceil(inqueryList.length / size);
  //문의목록 페이지 수 구하는 공식 Math.ceil 은 올림처리 함수
  //문의목록 총 수량을 페이지당 보여줄 데이터 수로 나눔
  //ex) 문의목록 144개 144/10=14.4 => 올림처리 결과 15
  const pageGroupSize = 10;
  // 한 페이지에 보여줄 페이지 수 ex) 1~10
  const currentPageGroup = Math.ceil(page / pageGroupSize);
  // 현재 페이지에 그룹 설정 1그룹 2그룹 이런식으로
  const startPage = (currentPageGroup - 1) * pageGroupSize + 1;
  // 보고있는 페이지 번호에 따라 표시되는 시작페이지 번호 설정
  // 1그룹은 1~10 번 표시해야됨 그룹은 1 계산식 대입하면 (1-1)*10+1 = 1
  // 2그룹은 11~15 번 표시해야됨 그룹은 2 계산식 대입하면 (2-1)*10+1 = 11
  const endPage = Math.min(getTotalPageCnt, startPage + pageGroupSize - 1);
  // 맨 마지막에 표시되어야 하는 페이지 Math.min 은 인자 2개 중 작은 값을 리턴
  // 한번에 10개의 페이지를 표시할때 startPage + pageGroupSize - 1 는 10, 20, 30 이런 단위로 나오는데 
  // 데이터가 144 개면 총 15 페이지가 나온다. 그래서 1그룹때는 10 이 맞지만 2그룹때는 15가 나와야 하니 2개 인자를 저렇게 설정
  const prevPage = startPage - 1;
  // 이전페이지 버튼을 누를때 계산식
  // 현재 페이지가 11일때 이전페이지 버튼 누르면 10으로 이동해야됨
  // 현재 페이지가 1일때는 활성화되면 안됨. 이는 InqueryPage 에 구현되어 있음 (prevPage > 0 && )
  const nextPage = endPage + 1;
  // 다음페이지 버튼 누를때 계산식
  // 현재페이지가 10일때 다음페이지 버튼 누르면 11으로 이동해야됨
  // 다음페이지가 없을때는 활성화되면 안됨. 이는 InqueryPage 에 구현되어 있음 (nextPage < getTotalPageCnt && )
  const startIndex = (page - 1) * size;
  // 페이지마다 꺼내올 배열의 데이터 인덱스 시작 번호 ex) 1페이지:0 2페이지:10 3페이지:20 ... 
  const endIndex = Math.min(page * size, totalCnt);
  // 페이지마다 꺼내올 배열의 데이터 인덱스 마지막 번호. 근데 slice 는 해당 번호 이전까지 자르기 때문에 -1을 안해도 됨 ex) 1페이지:9 2페이지:19 3페이지:29 
  // 데이터가 144개면 마지막에 143번이 되어야 하기 때문에 Math.min 설정 
  const currentList = inqueryList.slice(startIndex, endIndex);
  // 현재 페이지에서 보여줄 데이터 목록 문의목록 배열의 startIndex~endIndex-1 번호에 해당하는 데이터를 가져옴
  const pageNum = [];
  // 표시될 페이지 번호를 담는 배열
  for (let i = startPage; i <= endPage; i++) {
    pageNum.push(i);
    //데이터가 144개일때
    //1그룹일때 startPage=1 endPage=10 그래서 pageNum = [1,2,3...9,10] 이 된다
    //2그룹일때 startPage=11 endPage=15 그래서 pageNum = [11,12,13,14,15] 이 된다
  }

  return {
    page,
    size,
    getTotalPageCnt,
    pageGroupSize,
    currentPageGroup,
    startPage,
    endPage,
    totalCnt,
    startIndex,
    endIndex,
    currentList,
    pageNum,
    prevPage,
    nextPage,
  };
};

export default PageApi;
