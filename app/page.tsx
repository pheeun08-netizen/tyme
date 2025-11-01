"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태 관리
  const router = useRouter();

  const handleRealTimeAnalysis = () => {
    if (!loggedIn) {
      alert("로그인 후에 이용 가능합니다.");
    } else {
      router.push("/dashboard");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    alert("로그아웃 되었습니다.");
    router.push("/");
  };

  return (
    <div>
      {/* 상단 네비게이션 */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>AI 경비 시스템</div>
          <ul className={styles.navLinks}>
            <li><a href="#home">홈화면</a></li>
            <li>
              <button
                onClick={handleRealTimeAnalysis}
                className={styles.navButton}
              >
                실시간 분석
              </button>
            </li>
            {!loggedIn ? (
              <>
                <li>
                  <button
                    className={styles.navButton}
                    onClick={() => router.push("/login")}
                  >
                    로그인
                  </button>
                </li>
                <li>
                  <button
                    className={styles.navButton}
                    onClick={() => router.push("/sign up")}
                  >
                    회원가입
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className={styles.navButton}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>AI 경비 시스템 소개</h1>
          <p>
            와이파이 트래픽을 분석하여 스팸 메시지, 악성 코드를 AI가 감지합니다.
          </p>
          {/* 아래쪽 버튼 제거 */}
        </div>
      </section>

      {/* 기타 기존 홈 화면 섹션 유지 */}
    </div>
  );
}