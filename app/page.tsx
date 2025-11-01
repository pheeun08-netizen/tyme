// app/page.tsx (비로그인 초기 화면)


import React from 'react';
import styles from './home.module.css'; // 같은 레벨의 home.module.css를 사용한다고 가정


// Next.js App Router의 기본 페이지 (서버 컴포넌트 가능)
export default function LandingPage() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.welcomeText} text-indigo-600`}>
        경비 시스템에 오신 것을 환영합니다!
      </h1>
      <p className={styles.subText}>
        로그인하여 실시간 분석을 포함한 모든 기능을 이용해 보세요.
      </p>
     
      <div className="mt-10">
        <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">주요 기능 안내</h2>
            <ul className="space-y-3 text-left text-gray-600">
                <li><span className="font-medium text-indigo-600">실시간 분석:</span> 로그인 사용자 전용 (상단 바의 그래프 아이콘)</li>
                <li><span className="font-medium text-indigo-600">로그인:</span> 기존 사용자 접근 (상단 바의 사람 아이콘)</li>
                <li><span className="font-medium text-indigo-600">회원가입:</span> 새로운 사용자 등록 (상단 바의 + 아이콘)</li>
            </ul>
        </div>
      </div>
    </div>
  );
}