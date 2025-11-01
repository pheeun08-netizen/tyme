"use client";

import React, { useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Key, User } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 임시 로그인 로직 (실제로는 API 호출 및 검증 필요)
    if (username && password) {
      login(username);
      router.push('/home'); // 로그인 성공 시 홈 화면으로 이동
    } else {
      // alert() 대신 커스텀 모달 또는 인라인 에러 메시지 사용을 권장합니다.
      console.error('아이디와 비밀번호를 모두 입력해야 합니다.');
      alert('아이디와 비밀번호를 모두 입력해주세요.'); 
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogIn className="icon-large" style={{ color: 'var(--color-primary)' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)' }}>로그인</h2>
          <p style={{ color: 'var(--color-text-light)', marginTop: '0.5rem' }}>AI 경비 시스템에 접속하세요</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>아이디</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="사용자 아이디 입력"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>비밀번호</label>
            <div style={{ position: 'relative' }}>
              <Key style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <LogIn className="w-5 h-5" />
            로그인
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
          계정이 없으신가요? 
          <Link href="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', marginLeft: '0.5rem' }}>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

