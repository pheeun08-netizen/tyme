"use client";

import { useAuth } from '@/app/lib/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, UserPlus, TrendingUp, Shield, Home } from 'lucide-react';
import './Header.css'; // Header 컴포넌트 스타일

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // '경비 시스템' 로고 클릭 시 이동할 경로를 결정
  const handleLogoClick = () => {
    if (isAuthenticated) {
      router.push('/home');
    } else {
      router.push('/');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/'); // 로그아웃 후 app/page.tsx (루트)로 이동
  };

  return (
    <header className="main-header">
      <div className="header-content">
        {/* 왼쪽 상단: 로고 및 시스템 이름 */}
        <div className="header-logo" onClick={handleLogoClick}>
          <Shield className="logo-icon" />
          <span className="header-title">경비 시스템</span>
        </div>

        {/* 오른쪽 상단: 네비게이션 아이콘 */}
        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              {/* 로그인 후: 실시간 분석, 로그아웃 */}
              <Link href="/main" className="nav-link">
                <TrendingUp className="nav-icon" />
                <span className="nav-text-hidden">실시간 분석</span>
              </Link>
              <button onClick={handleLogout} className="nav-link">
                <LogOut className="nav-icon" />
                <span className="nav-text-hidden">로그아웃</span>
              </button>
            </>
          ) : (
            <>
              {/* 로그아웃 상태: 실시간 분석, 로그인, 회원가입 */}
              <Link href="/main" className="nav-link">
                <TrendingUp className="nav-icon" />
                <span className="nav-text-hidden">실시간 분석</span>
              </Link>
              <Link href="/login" className="nav-link">
                <LogIn className="nav-icon" />
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

export default Header;

