'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function HomePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')
    
    if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.')
      router.push('/login')
    } else {
      setUserEmail(email || '')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    toast.success('로그아웃 되었습니다.')
    router.push('/')
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo" onClick={() => router.push('/home')}>
             네트워크 트래픽 분석
          </div>
          <div className="nav-links">
            <button className="nav-button primary" onClick={() => router.push('/main')}>
              실시간 분석
            </button>
            <button className="nav-button secondary" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="hero">
          <h1>환영합니다! 👋</h1>
          <p>{userEmail}님의 네트워크를 보호하고 있습니다.</p>
          <button className="hero-button" onClick={() => router.push('/main')}>
            실시간 분석 시작하기
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