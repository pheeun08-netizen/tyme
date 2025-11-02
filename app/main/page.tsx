'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Flask API URL
const API_URL = 'http://172.30.1.92:5000'

interface Stats {
  total_traffic: string
  total_threats: number
  blocked_access: number
  security_score: number
}

interface Threat {
  timestamp: string
  source_ip: string
  destination_ip: string
  protocol: string
  reason: string
  severity: string
  action: string
}

export default function MainPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [stats, setStats] = useState<Stats>({
    total_traffic: '0 GB',
    total_threats: 0,
    blocked_access: 0,
    security_score: 100
  })
  const [threats, setThreats] = useState<Threat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 마운트 및 로그인 체크
  useEffect(() => {
    setMounted(true)
    const loggedIn = localStorage.getItem('isLoggedIn')
    setIsLoggedIn(!!loggedIn)
    if (!loggedIn) {
      setShowModal(true)
    }
  }, [])

  // 통계 데이터 가져오기
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setLastUpdate(new Date().toLocaleTimeString('ko-KR'))
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  // 위협 목록 가져오기
  const fetchThreats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/threats`)
      if (response.ok) {
        const data = await response.json()
        setThreats(data.threats || [])
      }
    } catch (error) {
      console.error('Failed to fetch threats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 초기 로드 및 3초마다 자동 갱신
  useEffect(() => {
    fetchStats()
    fetchThreats()

    const interval = setInterval(() => {
      fetchStats()
      fetchThreats()
    }, 3000) // 3초마다 갱신

    return () => clearInterval(interval)
  }, [])

  const handleModalClose = () => {
    setShowModal(false)
    router.push('/login')
  }

  const handleLogoClick = () => {
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

  // 심각도에 따른 색상
  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#e74c3c'
      case 'medium': return '#e67e22'
      case 'low': return '#f39c12'
      default: return '#95a5a6'
    }
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo" onClick={handleLogoClick}>
            네트워크 트래픽 분석
          </div>
          <div className="nav-links">
            <button className="nav-button primary" onClick={() => router.push('/main')}>
              실시간 분석
            </button>
            {!mounted ? (
              <button className="nav-button secondary" disabled>
                ...
              </button>
            ) : isLoggedIn ? (
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
          <p>
            AI가 실시간으로 네트워크 트래픽을 모니터링하고 있습니다.
            {lastUpdate && <span style={{marginLeft: '10px', opacity: 0.7}}>
              (마지막 업데이트: {lastUpdate})
            </span>}
          </p>
        </div>

        {isLoading ? (
          <div style={{textAlign: 'center', padding: '3rem', color: 'white', fontSize: '1.2rem'}}>
            데이터를 불러오는 중...
          </div>
        ) : (
          <>
            <div className="analysis-grid">
              <div className="stat-card">
                <h3>총 트래픽</h3>
                <div className="stat-value">{stats.total_traffic}</div>
              </div>
              <div className="stat-card">
                <h3>탐지된 위협</h3>
                <div className="stat-value" style={{color: '#e74c3c'}}>
                  {stats.total_threats}
                </div>
              </div>
              <div className="stat-card">
                <h3>차단된 접근</h3>
                <div className="stat-value" style={{color: '#e67e22'}}>
                  {stats.blocked_access}
                </div>
              </div>
              <div className="stat-card">
                <h3>보안 점수</h3>
                <div className="stat-value" style={{
                  color: stats.security_score >= 90 ? '#27ae60' : 
                         stats.security_score >= 70 ? '#f39c12' : '#e74c3c'
                }}>
                  {stats.security_score}%
                </div>
              </div>
            </div>

            <div className="traffic-chart">
              <h2>⚠️ 최근 위협 탐지 로그</h2>
              {threats.length === 0 ? (
                <div className="chart-placeholder">
                  현재 탐지된 위협이 없습니다. 시스템이 정상 작동 중입니다. ✅
                </div>
              ) : (
                <div style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '1rem',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}>
                  {threats.map((threat, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${getSeverityColor(threat.severity)}`
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <strong style={{color: getSeverityColor(threat.severity)}}>
                          [{threat.severity?.toUpperCase()}] {threat.protocol}
                        </strong>
                        <span style={{color: '#666', fontSize: '0.9rem'}}>
                          {new Date(threat.timestamp).toLocaleString('ko-KR')}
                        </span>
                      </div>
                      <div style={{color: '#333', marginBottom: '0.3rem'}}>
                        <strong>출발지:</strong> {threat.source_ip} → <strong>목적지:</strong> {threat.destination_ip}
                      </div>
                      <div style={{color: '#666', fontSize: '0.95rem'}}>
                        <strong>사유:</strong> {threat.reason}
                      </div>
                      <div style={{marginTop: '0.5rem'}}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.3rem 0.8rem',
                          background: threat.action === 'block' ? '#e74c3c' : '#3498db',
                          color: 'white',
                          borderRadius: '5px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          {threat.action === 'block' ? '🚫 차단됨' : '👁️ 모니터링'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
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