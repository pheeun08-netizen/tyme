"use client";

import { useAuth } from '@/app/lib/auth-context';
import { useRouter } from 'next/navigation';
import { ShieldAlert, BarChart3, Clock, Lock, TrendingUp, AlertTriangle, LogIn, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

// 데이터 구조 정의 (간단한 예시)
interface TrafficData {
    timestamp: string;
    sourceIp: string;
    destinationIp: string;
    protocol: string;
    status: 'Normal' | 'Suspicious' | 'Critical';
    bytes: number;
}

const RealtimeAnalysisPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // 임시 데이터 (실제 프로젝트에서는 서버에서 받아와야 합니다)
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);

  // 초기 로딩 시 로그인 상태 확인
  useEffect(() => {
    if (!isAuthenticated) {
      // 로그인이 되어 있지 않으면 로그인 화면으로 리디렉션하지 않고, 
      // 현재 페이지에서 경고 메시지를 보여줍니다. (사용자 요청 사항 반영)
      console.log('Access denied. User must be logged in.');
    } else {
      // 로그인 상태이면 데이터를 로드합니다.
      loadInitialData();
    }
  }, [isAuthenticated]);

  const loadInitialData = () => {
    // 5초 간격으로 시뮬레이션 데이터 업데이트
    const interval = setInterval(() => {
        const newData: TrafficData[] = generateMockTraffic();
        setTrafficData(newData.concat(trafficData.slice(0, 15))); // 최신 15개 유지
    }, 5000);

    // 컴포넌트 언마운트 시 인터벌 클리어
    return () => clearInterval(interval);
  };
  
  // 로그인 안 된 상태일 때 보여주는 화면
  if (!isAuthenticated) {
    return (
      <div className="flex-center" style={{ minHeight: 'calc(100vh - 120px)', padding: '4rem 0' }}>
        <Lock className="icon-large" style={{ color: 'var(--color-accent)' }} />
        <h1 className="text-4xl-bold" style={{ color: 'var(--color-accent)' }}>접근 제한</h1>
        <p className="text-xl-sub" style={{ color: 'var(--color-text)' }}>
          '실시간 분석' 대시보드는 **로그인 후**에 이용할 수 있습니다.
        </p>
        <button 
          onClick={() => router.push('/login')} 
          className="btn btn-primary"
          style={{ marginTop: '2rem' }}
        >
          <LogIn className="w-5 h-5" />
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  // 로그인 된 상태일 때 보여주는 실제 대시보드 화면
  const summary = calculateSummary(trafficData);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <BarChart3 style={{ marginRight: '0.75rem', color: 'var(--color-primary)' }} />
          실시간 네트워크 트래픽 분석 대시보드
      </h1>
      <p style={{ color: 'var(--color-text-light)', marginBottom: '2.5rem' }}>
          AI 경비병이 감지한 현재 네트워크 활동 및 보안 현황입니다. (5초마다 업데이트 시뮬레이션)
      </p>

      {/* 요약 카드 그리드 */}
      <div className="summary-grid">
        <SummaryCard 
          icon={TrendingUp} 
          title="총 처리 트래픽 (Bytes)" 
          value={formatBytes(summary.totalBytes)} 
          colorClass="summary-card-blue"
        />
        <SummaryCard 
          icon={ShieldAlert} 
          title="감지된 위협 건수" 
          value={summary.suspiciousCount} 
          colorClass="summary-card-red"
        />
        <SummaryCard 
          icon={Clock} 
          title="실시간 처리 속도 (PPS)" 
          value={`${Math.floor(Math.random() * 500 + 100)}/s`} // 임시 값
          colorClass="summary-card-green"
        />
      </div>

      {/* 실시간 트래픽 로그 테이블 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <AlertTriangle style={{ marginRight: '0.5rem', width: '1.5rem', height: '1.5rem' }} />
        최신 트래픽 로그 ({trafficData.length}개)
      </h2>
      <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>시간</th>
              <th>출발지 IP</th>
              <th>목적지 IP</th>
              <th>프로토콜</th>
              <th>바이트</th>
              <th>AI 분석 상태</th>
            </tr>
          </thead>
          <tbody>
            {trafficData.map((data, index) => (
              <tr key={index}>
                <td>{data.timestamp}</td>
                <td>{data.sourceIp}</td>
                <td>{data.destinationIp}</td>
                <td>{data.protocol}</td>
                <td>{formatBytes(data.bytes)}</td>
                <td style={{ color: getStatusColor(data.status), fontWeight: 600 }}>
                    {getStatusIcon(data.status)}
                    {data.status === 'Critical' ? '위험 감지' : data.status === 'Suspicious' ? '의심 활동' : '정상'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trafficData.length === 0 && (
            <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-light)' }}>
                    실시간 트래픽 데이터를 로드 중입니다...
                </td>
            </tr>
        )}
      </div>
    </div>
  );
};

export default RealtimeAnalysisPage;


// ----------------------------------------------------
// 보조 함수 및 컴포넌트
// ----------------------------------------------------

// 요약 카드 컴포넌트
const SummaryCard = ({ icon: Icon, title, value, colorClass }: any) => (
    <div className={`summary-card ${colorClass}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', fontWeight: 500 }}>{title}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '0.25rem' }}>{value}</h3>
            </div>
            <Icon style={{ width: '2rem', height: '2rem', color: 'var(--color-primary-light)', opacity: 0.7 }} />
        </div>
    </div>
);

// 데이터 시뮬레이션을 위한 임시 함수
const generateMockTraffic = (): TrafficData[] => {
    const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP'];
    const statuses: ('Normal' | 'Suspicious' | 'Critical')[] = ['Normal', 'Normal', 'Normal', 'Suspicious', 'Normal', 'Critical'];
    const mockData: TrafficData[] = [];

    for (let i = 0; i < 5; i++) {
        const statusIndex = Math.floor(Math.random() * statuses.length);
        const status = statuses[statusIndex];

        mockData.push({
            timestamp: new Date().toLocaleTimeString('ko-KR'),
            sourceIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
            destinationIp: `10.0.0.${Math.floor(Math.random() * 255)}`,
            protocol: protocols[Math.floor(Math.random() * protocols.length)],
            status: status,
            bytes: Math.floor(Math.random() * 10000) + (status === 'Critical' ? 50000 : 1000), // 위험 시 바이트 증가
        });
    }
    return mockData;
};

// 바이트 포맷팅
const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 요약 계산
const calculateSummary = (data: TrafficData[]) => {
    const totalBytes = data.reduce((sum, item) => sum + item.bytes, 0);
    const suspiciousCount = data.filter(item => item.status === 'Suspicious' || item.status === 'Critical').length;
    
    // (실시간 처리 속도는 복잡하므로 임시 값 사용)

    return { totalBytes, suspiciousCount };
};

// 상태에 따른 색상 반환
const getStatusColor = (status: TrafficData['status']) => {
    switch (status) {
        case 'Critical': return 'var(--color-error)';
        case 'Suspicious': return 'var(--color-accent)';
        case 'Normal': return 'var(--color-secondary)';
        default: return 'var(--color-text)';
    }
};

// 상태에 따른 아이콘 반환
const getStatusIcon = (status: TrafficData['status']) => {
    const style = { width: '1rem', height: '1rem', marginRight: '0.25rem' };
    switch (status) {
        case 'Critical': return <ShieldAlert style={style} />;
        case 'Suspicious': return <AlertTriangle style={style} />;
        case 'Normal': return <ShieldCheck style={style} />;
        default: return null;
    }
};

