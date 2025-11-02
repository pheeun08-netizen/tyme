'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MainPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      setShowModal(true)
    }
  }, [])

  const handleModalClose = () => {
    setShowModal(false)
    router.push('/login')
  }

  const handleLogoClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
      router.push('/home')
    } else {
      router.push('/')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')

  return (
    <div>
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo" onClick={handleLogoClick}>
            🛡️ 네트워크 트래픽 분석
          </div>
          <div className="nav-links">
            <button className="nav-button primary" onClick={() => router.push('/main')}>
              실시간 분석
            </button>
            {isLoggedIn ? (
              <button className="nav-button secondary" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <>
                <button className="nav-button secondary" onClick={() => router.push('/login')}>
                  로그인
                </button>
                <button className="nav-button secondary" onClick={() => router.push('/signup')}>
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container main-container">
        <div className="analysis-header">
          <h1>🔍 실시간 네트워크 분석</h1>
          <p>AI가 실시간으로 네트워크 트래픽을 모니터링하고 있습니다.</p>
        </div>

        <div className="analysis-grid">
          <div className="stat-card">
            <h3>총 트래픽</h3>
            <div className="stat-value">1.2 GB</div>
          </div>
          <div className="stat-card">
            <h3>탐지된 위협</h3>
            <div className="stat-value" style={{color: '#e74c3c'}}>3</div>
          </div>
          <div className="stat-card">
            <h3>차단된 접근</h3>
            <div className="stat-value" style={{color: '#e67e22'}}>12</div>
          </div>
          <div className="stat-card">
            <h3>보안 점수</h3>
            <div className="stat-value" style={{color: '#27ae60'}}>98%</div>
          </div>
        </div>

        <div className="traffic-chart">
          <h2>📈 트래픽 흐름</h2>
          <div className="chart-placeholder">
            실시간 차트 데이터가 여기에 표시됩니다
          </div>
        </div>

        <div className="traffic-chart">
          <h2>⚠️ 최근 위협 탐지 로그</h2>
          <div className="chart-placeholder">
            위협 탐지 로그가 여기에 표시됩니다
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>🔒 로그인 필요</h3>
            <p>실시간 분석 기능을 이용하려면 로그인이 필요합니다.</p>
            <button className="modal-button" onClick={handleModalClose}>
              로그인하러 가기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
