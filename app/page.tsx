"use client";

import Link from 'next/link';
import { ShieldCheck, TrendingUp, Lock, ArrowRight, LogIn, UserPlus } from 'lucide-react';

const PublicPage = () => {
  return (
    <div className="flex-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* 랜딩 페이지 메인 컨텐츠 */}
      <ShieldCheck className="icon-large" style={{ color: 'var(--color-primary)' }} />
      <h1 className="text-4xl-bold" style={{ marginBottom: '1rem' }}>
        AI 경비 시스템
      </h1>
      <p className="text-xl-sub" style={{ maxWidth: '600px', marginBottom: '3rem' }}>
        인공지능 기반의 첨단 네트워크 트래픽 분석으로 당신의 소중한 자산을 24시간 안전하게 보호합니다. 
        해커의 침입을 미리 감지하고 차단하세요.
      </p>

      {/* 액션 버튼 그룹 */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
        <Link href="/login" className="btn btn-primary">
          <LogIn className="w-5 h-5" />
          로그인 후 시작하기
        </Link>
        <Link href="/signup" className="btn btn-secondary">
          <UserPlus className="w-5 h-5" />
          회원가입
        </Link>
      </div>

      {/* 부가 정보 섹션 */}
      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '2rem', maxWidth: '800px' }}>
        <FeatureCard 
          icon={TrendingUp} 
          title="실시간 분석" 
          description="로그인 후 상세 대시보드에서 현재 네트워크 상태를 초 단위로 확인하세요."
        />
        <FeatureCard 
          icon={Lock} 
          title="최고의 보안" 
          description="강력한 AI 알고리즘이 알려지지 않은 위협까지 식별하고 차단합니다."
        />
      </div>
    </div>
  );
};

// 작은 기능 카드 컴포넌트
const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="card" style={{ padding: '1.5rem', flex: 1, textAlign: 'left', borderTop: '4px solid var(--color-primary-light)' }}>
    <Icon className="w-6 h-6" style={{ color: 'var(--color-primary-light)', marginBottom: '0.75rem' }} />
    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>{description}</p>
    <Link href="/login" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
      자세히 보기 <ArrowRight style={{ width: '1rem', height: '1rem', marginLeft: '0.5rem' }} />
    </Link>
  </div>
);

export default PublicPage;

