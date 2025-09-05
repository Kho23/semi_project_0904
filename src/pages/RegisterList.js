import { useState } from "react";
import RegisterApi from "../api/RegisterApi";

const RegisterList = () => { // RegisterApi 훅에서 필요한 상태와 함수들을 불러옴
  const {
    agreeList, // - agreeList: 이용약관 리스트
    accepted, // - accepted: 이용약관 동의 여부(boolean 배열)
    setAccepted, // - setAccepted: 동의 여부 상태 갱신 함수
    currentList, // - currentList: 현재 진행 중인 약관 단계 (인덱스)
    setCurrentList, // - setCurrentList: 현재 단계 상태 갱신 함수
    Current, // - Current: 현재 단계에 해당하는 컴포넌트
  } = RegisterApi(); // RegisterApi 훅에서 필요한 상태와 함수들을 불러옴

  return (
    <div>
      {/* 상단 탭 영역: 이용약관 제목과 동의 여부 표시 */}
      {agreeList.map((item, idx) => (
        <span className="threetab">
          {item.label}
          {accepted[idx] && "✅"} {/* 동의한 경우 체크 아이콘 표시 */}
        </span>
      ))}

      {/* 현재 단계의 컴포넌트 렌더링 */}
      <Current />

      {/* 첫 번째 단계(이용약관)일 때만 체크박스 표시 */}
      {currentList === 0 && (
        <label className="agreecheckbox">
          <input
            type="checkbox"
            checked={accepted[0]} // 이용약관 동의 여부
            onChange={(e) => 
              setAccepted( // 체크 상태가 바뀌면 accepted 배열 상태 갱신
                accepted.map((v, idx) => // 기존 상태 배열을 map으로 순회하며
                  idx === currentList ? e.target.checked : v
                ) // 현재 단계(currentList) 인덱스만 e.target.checked로 변경
              ) // 나머지는 그대로 유지
            }
          />
          [{agreeList[0].label}] 내용을 읽고 동의합니다.
        </label>
      )}

      {/* 첫 번째 단계(이용약관)일 때만 '다음' 버튼 표시 */}
      {currentList === 0 && (
        <button 
          className="agreenextbox"
          onClick={() => setCurrentList(currentList + 1)}
          // 버튼 클릭 시 다음 단계로 이동
          disabled={!accepted[0]} 
          // 동의하지 않으면 버튼 비활성화
        > 
          다음 →
        </button>
      )}
    </div>
  );
};

export default RegisterList;
