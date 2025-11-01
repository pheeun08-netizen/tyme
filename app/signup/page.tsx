"use client";


import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';


export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  // NOTE: 실제 서비스에서는 window.alert 대신 사용자 정의 모달을 사용해야 합니다.
  const customAlert = (message: string) => console.log(`[Alert] ${message}`);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    setTimeout(() => {
        customAlert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        router.push('/login');
    }, 1500);
  };
 
  return (
    <div className="flex-center" style={{ padding: '2.5rem 0' }}>
      <div className="card" style={{ maxWidth: '576px', width: '100%', textAlign: 'center' }}>
        <UserPlus style={{ width: '2.5rem', height: '2.5rem', color: 'var(--color-primary)', margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '2rem' }}>회원가입</h2>
       
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 이름 필드 */}
          <div>
            <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', textAlign: 'left', marginBottom: '0.25rem' }}>
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="홍길동"
              className="form-input"
            />
          </div>
           
          {/* 이메일 필드 */}
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


          {/* 비밀번호 필드 */}
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', textAlign: 'left', marginBottom: '0.25rem' }}>
              비밀번호 (8자 이상)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="********"
              minLength={8}
              className="form-input"
            />
          </div>
         
          {/* 비밀번호 확인 필드 */}
          <div>
            <label htmlFor="confirm-password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', textAlign: 'left', marginBottom: '0.25rem' }}>
              비밀번호 확인
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              placeholder="********"
              minLength={8}
              className="form-input"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="btn btn-green"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? '가입 처리 중...' : '회원가입 완료'}
          </button>
        </form>


        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                이미 계정이 있으신가요?
                <a href="/login" style={{ marginLeft: '0.5rem', fontWeight: 500, color: 'var(--color-primary)' }}>
                    로그인
                </a>
            </p>
        </div>
      </div>
    </div>
  );
}