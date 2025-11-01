"use client";
import styles from "./home.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>AI 보안 경비 시스템</h1>
        <p>Wi-Fi 트래픽을 분석해 스팸 메시지와 악성코드를 실시간으로 차단합니다.</p>
        <div className={styles.ctaButtons}>
          <Link href="/login" className={styles.ctaButton}>로그인</Link>
          <Link href="/signup" className={styles.ctaButton}>회원가입</Link>
        </div>
      </div>
    </div>
  );
}


