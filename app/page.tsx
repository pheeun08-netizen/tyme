"use client";

export default function HomePage() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>AI 경비 시스템 소개</h1>
        <p>와이파이 트래픽 분석을 통해 스팸 메시지와 악성 코드를 AI가 탐지합니다.</p>
        <button className="cta-button" onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}>
          시작하기
        </button>
      </div>
    </section>
  );
}
