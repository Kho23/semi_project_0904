import { createContext } from "react";
// 전역 상태 관리를 위한 Context 생성

export const infoContext = createContext(null); 
// 초기값은 null (Provider에서 실제 값이 주입될 예정)
// 예: 회원정보, 로그인 상태 등을 컴포넌트 트리 전역에서 공유 가능