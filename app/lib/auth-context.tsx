"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';

// 인증 상태의 타입을 정의합니다.
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  user: { username: string } | null;
}

// 기본 Context 값 (초기 상태)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 인증 Context Provider 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 실제 프로젝트에서는 로컬 스토리지나 서버 세션을 사용해야 합니다.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUser({ username });
    // 실제 로그인 로직 (API 호출 등)이 여기에 들어갑니다.
    console.log(`User ${username} logged in.`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // 실제 로그아웃 로직 (API 호출 등)이 여기에 들어갑니다.
    console.log('User logged out.');
  };

  // Context 값을 useMemo로 래핑하여 불필요한 리렌더링을 방지합니다.
  const value = useMemo(() => ({
    isAuthenticated,
    login,
    logout,
    user
  }), [isAuthenticated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 훅을 만들어 컴포넌트에서 쉽게 Context에 접근하도록 합니다.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

