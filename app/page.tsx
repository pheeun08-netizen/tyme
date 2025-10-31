'use client'; 

import { useRouter } from 'next/navigation';
import styles from './home.module.css'; // CSS 모듈 임포트 (home.module.css 파일을 만드세요)
import React from 'react';

export default function Home() {
  const router = useRouter();

  const goToLogin = () => router.push('/login');
  const goToSignUp = () => router.push('/signup');

  return (
    // CSS 모듈로 정의된 컨테이너와 애니메이션 클래스 적용
    <div className={styles.container}>
      
      {/* 배경 무브먼트 요소 추가 */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.bubble} ${styles.bubble1}`}></div>
        <div className={`${styles.bubble} ${styles.bubble2}`}></div>
        <div className={`${styles.bubble} ${styles.bubble3}`}></div>
      </div>

      {/* 콘텐츠 */}
      <header className={styles.header}>
        <h1 className={styles.title}>🚀 My Program Platform</h1>
        <p className={styles.description}>
          AI 기반 작업을 웹에서 바로 실행하고 관리하세요.
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button 
            onClick={goToLogin} 
            className={`${styles.button} ${styles.primaryButton}`}
          >
            로그인
          </button>
          <button 
            onClick={goToSignUp} 
            className={styles.button}
          >
            회원가입
          </button>
        </div>
      </main>
    </div>
  );
}
