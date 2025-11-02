'use client'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div>
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo" onClick={() => router.push('/')}>
            🛡️ 네트워크 트래픽 분석
          </div>
          <div className="nav-links">
            <button className="nav-button primary" onClick={() => router.push('/main')}>
              실시간 분석
            </button>
            <button className="nav-button secondary" onClick={() => router.push('/login')}>
              로그인
            </button>
            <button className="nav-button secondary" onClick={() => router.push('/signup')}>
              회원가입
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="hero">
          <h1>🔒 AI 기반 네트워크 보안</h1>
          <p>실시간으로 해킹을 탐지하고 차단하는 지능형 경비병 시스템</p>
          <button className="hero-button" onClick={() => router.push('/signup')}>
            지금 시작하기
          </button>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>실시간 모니터링</h3>
            <p>네트워크 트래픽을 실시간으로 분석하고 이상 징후를 즉시 탐지합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI 기반 탐지</h3>
            <p>머신러닝 알고리즘으로 새로운 공격 패턴도 자동으로 학습합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>직관적인 대시보드</h3>
            <p>복잡한 네트워크 데이터를 누구나 이해하기 쉽게 시각화합니다.</p>
          </div>
        </section>
      </div>
    </div>
  )
}