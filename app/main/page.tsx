"use client";


import { useAuth } from '@/app/lib/auth-context';
import { Lock, TrendingUp, AlertTriangle } from 'lucide-react';


export default function MainPage() {
  const { isLoggedIn } = useAuth();
 
  // 로그인 상태 확인 로직
  if (!isLoggedIn) {
    return (
      <div className="flex-center" style={{ padding: '5rem 0' }}>
        <div className="card text-center" style={{ maxWidth: '600px', width: '100%', border: '1px solid var(--color-error)' }}>
          <Lock style={{ width: '3rem', height: '3rem', color: 'var(--color-error)', margin: '0 auto 1rem auto' }} />
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-error)', marginBottom: '1rem' }}>접근 제한됨</h1>
          <p style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '1.5rem' }}>
            이 기능은 보안상 <span style={{ fontWeight: 800 }}>로그인</span>을 한 후에만 이용할 수 있습니다.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
              <a href="/login" className="btn btn-primary">
                  로그인 페이지로 이동
              </a>
          </div>
        </div>
      </div>
    );
  }


  // 로그인 후 보여지는 실제 분석 내용 (모의)
  return (
    <div style={{ padding: '2.5rem 0' }}>
      <h1 className="main-title">
        <TrendingUp style={{ width: '2rem', height: '2rem', color: 'var(--color-primary)', marginRight: '0.75rem' }} />
        실시간 트래픽 분석 대시보드
      </h1>


      <div className="summary-grid">
        {/* 분석 요약 카드 1 */}
        <div className="summary-card-blue">
          <p className="summary-label">현재 트래픽 (MB/s)</p>
          <p className="summary-value">45.2</p>
        </div>
        {/* 분석 요약 카드 2 */}
        <div className="summary-card-red">
          <p className="summary-label">탐지된 위협 (24H)</p>
          <p className="summary-value-red">12</p>
        </div>
        {/* 분석 요약 카드 3 */}
        <div className="summary-card-green">
          <p className="summary-label">AI 탐지 정확도</p>
          <p className="summary-value-green">99.8%</p>
        </div>
      </div>
     
      {/* 실시간 탐지 로그 테이블 (모의) */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>실시간 탐지 로그</h2>
        <table className="data-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">시간</th>
              <th className="table-header">소스 IP</th>
              <th className="table-header">위협 유형</th>
              <th className="table-header">심각도</th>
              <th className="table-header">처리</th>
            </tr>
          </thead>
          <tbody>
            {/* Mock Data */}
            <tr className="table-data-row">
              <td className="table-data">14:32:01</td>
              <td className="table-data font-medium">192.168.1.105</td>
              <td className="table-data">Port Scan</td>
              <td className="table-data">
                <span className="badge badge-warn">
                  경고
                </span>
              </td>
              <td className="table-data color-green">차단됨</td>
            </tr>
            <tr className="table-data-row">
              <td className="table-data">14:31:45</td>
              <td className="table-data font-medium">10.0.0.88</td>
              <td className="table-data">정상 트래픽</td>
              <td className="table-data">
                <span className="badge badge-green">
                  안전
                </span>
              </td>
              <td className="table-data color-gray">허용</td>
            </tr>
            <tr className="table-data-row">
              <td className="table-data">14:29:10</td>
              <td className="table-data font-medium">203.0.113.12</td>
              <td className="table-data">DDoS 시도</td>
              <td className="table-data">
                <span className="badge badge-red">
                  위험
                </span>
              </td>
              <td className="table-data color-red">차단됨</td>
            </tr>
          </tbody>
        </table>
      </div>
     
      <div style={{ marginTop: '2rem', textAlign: 'center', color: '#6b7280' }}>
        <p>데이터는 5초마다 자동 갱신됩니다.</p>
      </div>
    </div>
  );
}