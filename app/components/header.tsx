"use client";


import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import { LogOut, Key, UserPlus, Zap } from 'lucide-react'; // 아이콘 사용
import './Header.css'; // 새로 생성한 CSS 파일 import


export const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();


  // '경비 시스템' 로고 클릭 핸들러
  const handleLogoClick = () => {
    if (isLoggedIn) {
      router.push('/home'); // 로그인 상태 -> /home
    } else {
      router.push('/'); // 로그아웃 상태 -> /
    }
  };


  // '로그아웃' 버튼 클릭 핸들러
  const handleLogout = () => {
    logout();
    router.push('/'); // 로그아웃 후 app/page.tsx (루트)로 이동
  };


  return (
    <header className="main-header">
      <div className="container header-content">


        {/* 왼쪽: 시스템 이름 (로고) */}
        <div
          onClick={handleLogoClick}
          className="logo-text"
        >
          <Zap className="logo-icon" />
          <span>경비 시스템</span>
        </div>


        {/* 오른쪽: 내비게이션 링크 */}
        <nav className="header-nav">
          {/* 1. 실시간 분석 (로그인 여부와 관계없이 노출) */}
          <Link href="/main" className="nav-link">
            <Zap className="nav-icon" />
            <span className="nav-text-hidden">실시간 분석</span>
          </Link>


          {/* 로그인 상태에 따른 조건부 링크 */}
          {isLoggedIn ? (
            // --- 로그인 후 상태: '로그아웃' 아이콘 ---
            <button onClick={handleLogout} className="nav-link" title="로그아웃">
              <LogOut className="nav-icon" />
              <span className="nav-text-hidden">로그아웃</span>
            </button>
          ) : (
            // --- 로그아웃 전 상태: '로그인', '회원가입' 아이콘 ---
            <>
              <Link href="/login" className="nav-link">
                <Key className="nav-icon" />
                <span className="nav-text-hidden">로그인</span>
              </Link>
              <Link href="/signup" className="nav-link">
                <UserPlus className="nav-icon" />
                <span className="nav-text-hidden">회원가입</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


// export default Header;