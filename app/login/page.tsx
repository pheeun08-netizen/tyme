'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Login() {
  const router = useRouter();
  // useState의 타입을 string으로 명확히 정의
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 이벤트 핸들러의 타입을 명확히 정의합니다.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username && password) {
      console.log('로그인 시도:', { username });
      alert('로그인 성공! 실행 창으로 이동합니다.');
      
      router.push('/dashboard');
    } else {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px', backgroundColor: '#f8f9fa' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>로그인</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white' }}>로그인</button>
      </form>
    </div>
  );
}
