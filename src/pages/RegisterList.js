import { useState } from 'react';
import RegisterApi from '../api/RegisterApi';

const RegisterList = () => {
  const { agreeList,
    accepted,
    setAccepted,
    currentList,
    setCurrentList,
    Current,
    TermsDoc } = RegisterApi()

  return (
    <div>
      {/* 상단 탭 */}
      {agreeList.map((item, idx) => (
        <span className="threetab" >
          {item.label}{accepted[idx] && "✅"}
        </span>
      ))}

      {/* 현재 단계 내용 */}
      < Current />

      {/* 이용약관 동의 버튼 */}
      {currentList === 0 && (
        <label className="agreecheckbox">
          <input
            type="checkbox"
            checked={accepted[0]}
            onChange={(e) =>
              setAccepted(accepted.map((v, idx) =>
                idx === currentList ? e.target.checked : v
              ))
            } />
          [{agreeList[0].label}] 내용을 읽고 동의합니다.
        </label>
      )}

      {/* 다음 단계 버튼 */}
      {currentList === 0 && (
        <button className="agreenextbox"
          onClick={() => setCurrentList(currentList + 1)}
          disabled={!accepted[0]}
        >
          다음 →
        </button>
      )}
    </div>
  )
}

export default RegisterList;