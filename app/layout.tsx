import React from 'react';
import './globals.css'; // 전역 CSS 임포트 (필요하다면 유지)

export const metadata = {
  title: 'My Program Platform',
  description: '순수 CSS로 스타일링된 웹사이트입니다.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const globalFontStyle = {
    fontFamily: "'Noto Sans KR', sans-serif", // Google Fonts 적용
    backgroundColor: '#1e2025', // 다크 모드 배경색
    color: '#e0e0e0', // 다크 모드 기본 텍스트 색상
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  };

  return (
    // 1. <html> 태그가 반드시 필요합니다.
    <html lang="ko">
      {/* 2. <head> 내용을 직접 정의할 필요는 없지만, 폰트 링크는 <head>에 위치해야 합니다. */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      
      {/* 3. <body> 태그가 반드시 필요하며, 여기에 전역 스타일을 적용합니다. */}
      <body style={globalFontStyle}>
        {/* 4. children prop은 페이지 내용을 렌더링합니다. */}
        {children}
      </body>
    </html>
  );
}   