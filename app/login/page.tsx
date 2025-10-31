'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      // 실제 서버 통신 대신 Mock 로직을 수행합니다.
      console.log('로그인 시도:', { username });
      alert('로그인 성공! 실행 창으로 이동합니다.');
      router.push('/dashboard');
    } else {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
    }
  };


  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #555',
    borderRadius: '6px',
    boxSizing: 'border-box' as 'border-box',
    background: '#383a40', // 인풋 배경
    color: '#e0e0e0', // 인풋 텍스트 색상
    transition: 'border-color 0.3s',
    outline: 'none',
  };


  return (
    // 배경색: #1e2025, 중앙 정렬
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '50px', backgroundColor: '#1e2025' }}>
     
      {/* 폼 컨테이너: 어두운 카드 스타일 */}
      <form onSubmit={handleSubmit} style={{
        background: '#2c2e33', // 폼 배경
        padding: '35px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
        maxWidth: '400px',
        width: '100%',
        border: '1px solid #444',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#8c9eff', fontSize: '1.8rem', fontWeight: 700 }}>로그인</h2>
       
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#c0c0c0', fontWeight: 500 }}>아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
            // 포커스 시 테두리 색상 변경
            onFocus={(e) => e.currentTarget.style.borderColor = '#8c9eff'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#555'}
          />
        </div>
       
        <div style={{ marginBottom: '30px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#c0c0c0', fontWeight: 500 }}>비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            // 포커스 시 테두리 색상 변경
            onFocus={(e) => e.currentTarget.style.borderColor = '#8c9eff'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#555'}
          />
        </div>
       
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: '#5d5dff', // 로그인 버튼 색상 (주요 색상)
            color: 'white',
            fontWeight: 700,
            transition: 'background-color 0.3s, transform 0.2s',
            boxShadow: '0 5px 15px rgba(93, 93, 255, 0.3)',
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#4a4ade'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#5d5dff'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}