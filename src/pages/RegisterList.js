import { useState } from 'react';
import RegisterApi from '../api/RegisterApi';

const RegisterList = () => {
  const { agreeList,
    accepted,
    setAccepted,
    currentList,
    setCurrentList,
    Current,
    TermsDoc } = RegisterApi();

  return (
    <div>
      {/* 상단 탭 */}
      <div className="mb-5">
        {agreeList.map((item, idx) => (
          <span 
            key={idx} 
            className="inline-block mr-3 py-1.5 px-3 rounded-lg bg-gray-300 cursor-default font-medium transition-colors duration-200"
          >
            {item.label}{accepted[idx] && "✅"}
          </span>
        ))}
      </div>

      {/* 현재 단계 내용 */}
      <div className="mt-5">
        <Current />
      </div>

      {/* 이용약관 동의 버튼 */}
      {currentList === 0 && (
        <label className="text-lg ml-16 inline-flex items-center cursor-pointer text-red-500 mt-5">
          <input
            type="checkbox"
            checked={accepted[0]}
            onChange={(e) =>
              setAccepted(accepted.map((v, idx) =>
                idx === currentList ? e.target.checked : v
              ))
            } 
            className="mr-2 w-5 h-5"
          />
          [{agreeList[0].label}] 내용을 읽고 동의합니다.
        </label>
      )}

      {/* 다음 단계 버튼 */}
      {currentList === 0 && (
        <div className="mt-5">
          <button 
            className="my-5 ml-16 py-2.5 px-4.5 bg-indigo-600 text-white border-none rounded-lg text-base cursor-pointer transition-colors duration-200 hover:enabled:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => setCurrentList(currentList + 1)}
            disabled={!accepted[0]}
          >
            다음 →
          </button>
        </div>
      )}
    </div>
  );
}

export default RegisterList;