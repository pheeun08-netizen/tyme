"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Key, User } from 'lucide-react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 임시 회원가입 로직 (실제로는 API 호출 및 데이터 저장 필요)
    if (username && email && password) {
      // alert() 대신 커스텀 모달 사용 권장
      alert(`회원가입 성공! (아이디: ${username})`);
      console.log(`User registered: ${username}, ${email}`);
      router.push('/login'); // 회원가입 후 로그인 페이지로 이동
    } else {
      console.error('모든 필드를 입력해야 합니다.');
      alert('모든 필드를 입력해주세요.');
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <UserPlus className="icon-large" style={{ color: 'var(--color-secondary)' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)' }}>회원가입</h2>
          <p style={{ color: 'var(--color-text-light)', marginTop: '0.5rem' }}>보안 시스템 사용을 시작하세요</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>아이디</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="사용할 아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>이메일</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="비밀번호 설정"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-green" style={{ marginTop: '1rem' }}>
            <UserPlus className="w-5 h-5" />
            가입하기
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
          이미 계정이 있으신가요? 
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', marginLeft: '0.5rem' }}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

