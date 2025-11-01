"use client";

import { useAuth } from '@/app/lib/auth-context';
import { ShieldCheck, TrendingUp, AlertTriangle, MessageSquare, ArrowRight } from 'lucide-react';
import styles from './home.module.css';
import Link from 'next/link';

const HomePage = () => {
  const { user } = useAuth();
  const userName = user?.username || '사용자';

  return (
    <div className={styles.contentWrapper}>
      <ShieldCheck className="icon-large" style={{ color: 'var(--color-primary)' }} />
      <h1 className={styles.welcomeTitle}>
        환영합니다, {userName}님!
      </h1>
      <p className={styles.welcomeSubtitle}>
        AI 경비 시스템의 실시간 보안 대시보드에서 네트워크 상태를 확인하고, 
        주요 기능을 빠르게 이용해보세요.
      </p>

      {/* 주요 기능 그리드 */}
      <div className={styles.gridContainer}>
        {/* 1. 실시간 분석 카드 */}
        <FeatureCard 
          icon={TrendingUp} 
          title="실시간 분석 대시보드" 
          description="현재 네트워크 트래픽 패턴과 의심스러운 활동을 실시간으로 모니터링합니다."
          link="/main"
          linkText="대시보드 바로가기"
          iconColorClass={styles.cardIconBlue}
          borderClass={styles.cardBorderBlue}
          linkClass={styles.cardLinkBlue}
        />
        
        {/* 2. 보안 경고 로그 카드 */}
        <FeatureCard 
          icon={AlertTriangle} 
          title="최근 보안 경고" 
          description="AI가 탐지한 잠재적 위협 목록과 상세 정보를 확인하고 조치하세요."
          link="/main#alerts" // 임시 링크
          linkText="경고 로그 확인"
          iconColorClass={styles.cardIconYellow}
          borderClass={styles.cardBorderYellow}
          linkClass={styles.cardLinkYellow}
        />
        
        {/* 3. 시스템 설정 카드 */}
        <FeatureCard 
          icon={MessageSquare} 
          title="AI 방어 설정" 
          description="경비 시스템의 규칙, 민감도, 방화벽 정책 등을 맞춤 설정하고 관리합니다."
          link="/settings" // 임시 링크
          linkText="설정 페이지 이동"
          iconColorClass={styles.cardIconGreen}
          borderClass={styles.cardBorderGreen}
          linkClass={styles.cardLinkGreen}
        />
      </div>

      {/* 추가 정보 섹션 */}
      <div style={{ padding: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
              AI 경비병은 어떻게 작동하나요?
          </h2>
          <p style={{ color: 'var(--color-text-light)', maxWidth: '800px', margin: '0 auto' }}>
              저희 시스템은 머신러닝 모델을 사용하여 정상적인 트래픽과 이상 트래픽을 분류합니다. 
              일반적인 시그니처 기반 방어 시스템이 놓칠 수 있는 새로운 유형의 제로데이 공격도 
              실시간으로 학습하고 감지하여 높은 방어율을 자랑합니다.
          </p>
      </div>
    </div>
  );
};

// FeatureCard 컴포넌트 정의
const FeatureCard = ({ icon: Icon, title, description, link, linkText, iconColorClass, borderClass, linkClass }: any) => (
  <div className={`${styles.card} ${borderClass}`}>
    <Icon className={`${styles.cardIcon} ${iconColorClass}`} />
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardText}>{description}</p>
    <Link href={link} className={`${styles.cardLink} ${linkClass}`}>
      {linkText} <ArrowRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
    </Link>
  </div>
);

export default HomePage;

