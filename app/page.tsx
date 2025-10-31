'use client'; 

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login'); // /login 경로로 이동
  };

  const goToSignUp = () => {
    router.push('/signup'); // /signup 경로로 이동
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <header>
        <h1>🚀 내 프로그램 웹사이트</h1>
        <p style={{ color: '#555', marginBottom: '30px' }}>
          이 웹사이트는 제 프로그램을 웹에서 실행하기 위한 플랫폼입니다. 타입스크립트 버전입니다.
        </p>
      </header>

      <main>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button 
            onClick={goToLogin} 
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            로그인
          </button>
          <button 
            onClick={goToSignUp} 
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f3f3f3', color: '#333', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            회원가입
          </button>
        </div>
      </main>
    </div>
  );
}
