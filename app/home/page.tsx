"use client";


import { useAuth } from '@/app/lib/auth-context';
import { ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import styles from './home.module.css';


export default function HomePage() {
  const { isLoggedIn } = useAuth();
 
  if (!isLoggedIn) {
    return (
      <div className="text-center" style={{ padding: '5rem 0' }}>
        <AlertTriangle style={{ width: '3rem', height: '3rem', color: 'var(--color-error)', margin: '0 auto 1rem auto' }} />
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text)' }}>접근 권한 없음</h1>
        <p style={{ fontSize: '1.125rem', color: '#4b5563', marginTop: '0.5rem' }}>
          이 페이지는 로그인 후에만 접근 가능합니다.
        </p>
      </div>
    );
  }


  return (
    <div style={{ padding: '2.5rem 0' }}>
      <h1 className={`${styles.welcomeTitle} title-border`}>
        <ShieldCheck style={{ width: '2rem', height: '2rem', color: 'var(--color-secondary)', marginRight: '0.5rem' }} />
        환영합니다, AI 경비병 관리자!
      </h1>
     
      <div className={styles.gridContainer}>
       
        {/* 카드 1: 실시간 분석 */}
        <div className={`${styles.card} ${styles.cardBorderBlue}`}>
          <TrendingUp className={styles.cardIconBlue} />
          <h2 className={styles.cardTitle}>실시간 트래픽 분석</h2>
          <p className={styles.cardText}>
            현재 네트워크 상태를 즉시 확인하고 잠재적인 위협을 감지하세요. 대시보드로 이동합니다.
          </p>
          <a href="/main" className={styles.cardLinkBlue}>
            대시보드 보기 &rarr;
          </a>
        </div>
       
        {/* 카드 2: 시스템 상태 */}
        <div className={`${styles.card} ${styles.cardBorderGreen}`}>
          <ShieldCheck className={styles.cardIconGreen} />
          <h2 className={styles.cardTitle}>경비 시스템 상태</h2>
          <p className={styles.cardText}>
            AI 모델이 활성화되어 있으며, 현재까지 12건의 의심스러운 패킷을 차단했습니다.
          </p>
          <button className={styles.cardLinkGreen}>
            설정 관리 &rarr;
          </button>
        </div>
       
        {/* 카드 3: 알림 및 로그 */}
        <div className={`${styles.card} ${styles.cardBorderYellow}`}>
          <AlertTriangle className={styles.cardIconYellow} />
          <h2 className={styles.cardTitle}>주요 알림</h2>
          <p className={styles.cardText}>
            지난 24시간 동안 중간 위험 경보 3건이 발생했습니다. 자세한 로그를 확인하십시오.
          </p>
          <button className={styles.cardLinkYellow}>
            로그 확인 &rarr;
          </button>
        </div>
      </div>
     
      <div className="card" style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>프로젝트 개요</h3>
        <p style={{ color: '#374151', lineHeight: '1.625' }}>
          이 AI 경비병 시스템은 DPI(Deep Packet Inspection) 기술과 머신러닝 모델을 결합하여, 기존 방화벽이 놓칠 수 있는 제로데이 공격 및 지능형 지속 위협(APT)을 실시간으로 식별하고 대응하도록 설계되었습니다. 해커톤 목표는 사용자 친화적인 대시보드를 통해 비전문가도 보안 상태를 쉽게 이해하도록 돕는 것입니다.
        </p>
      </div>
    </div>
  );
}