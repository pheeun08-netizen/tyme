"use client";


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// 1. Context 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}


// 2. Context 생성 (기본값 설정)
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// 3. Provider 컴포넌트
interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 모의 사용자 인증 상태. 실제 앱에서는 Firebase/Supabase 등에서 가져와야 합니다.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  // 컴포넌트 마운트 시 저장된 인증 상태를 로드하는 (모의) 로직
  useEffect(() => {
    // Canvas 환경에서는 localStorage 사용이 제한되므로, 초기 상태를 false로 유지합니다.
    // 실제 환경에서는 localStorage.getItem('isLoggedIn') 등을 사용합니다.
    const initialAuthStatus = false;
    setIsLoggedIn(initialAuthStatus);
  }, []);


  const login = () => {
    // 실제 로그인 API 호출 로직이 들어가야 합니다.
    console.log("로그인 처리됨: 상태를 true로 설정합니다.");
    setIsLoggedIn(true);
    // localStorage.setItem('isLoggedIn', 'true'); // 실제 앱에서 사용
  };


  const logout = () => {
    // 실제 로그아웃 API 호출 로직이 들어가야 합니다.
    console.log("로그아웃 처리됨: 상태를 false로 설정합니다.");
    setIsLoggedIn(false);
    // localStorage.removeItem('isLoggedIn'); // 실제 앱에서 사용
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// 4. Custom Hook 정의
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};