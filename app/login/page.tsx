"use client";


import { useAuth } from '@/app/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Key } from 'lucide-react';
import { useState } from 'react';


export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  // NOTE: 실제 서비스에서는 window.alert 대신 사용자 정의 모달을 사용해야 합니다.
  const customAlert = (message: string) => console.log(`[Alert] ${message}`);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
   
    setTimeout(() => {
        login();
        router.push('/home');
    }, 1500);
  };


  return (
    <div className="flex-center" style={{ padding: '2.5rem 0' }}>
      <div className="card" style={{ maxWidth: '448px', width: '100%', textAlign: 'center' }}>
        <Key style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-primary)', margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '2rem' }}>로그인</h2>
       
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', textAlign: 'left', marginBottom: '0.25rem' }}>
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="user@example.com"
              className="form-input"
            />
          </div>


          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', textAlign: 'left', marginBottom: '0.25rem' }}>
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="********"
              className="form-input"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>


        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                아직 계정이 없으신가요?
                <a href="/signup" style={{ marginLeft: '0.5rem', fontWeight: 500, color: 'var(--color-primary)' }}>
                    회원가입
                </a>
            </p>
        </div>
      </div>
    </div>
  );
}