'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

// 폼 데이터의 타입을 정의합니다.
interface FormData {
  name: string;
  dob: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  
  // useState에 FormData 타입을 적용하고, 초기값을 지정합니다.
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: '', 
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  const [agreed, setAgreed] = useState(false);

  // 이벤트 핸들러의 타입을 명확히 정의합니다.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      alert('이용약관에 동의해야 합니다.');
      return;
    }

    console.log('회원가입 데이터:', formData);
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    
    router.push('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px', backgroundColor: '#f9f9f9' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>회원가입</h2>
        
        {/* 모든 input 요소에 onChange, value, name을 명확히 지정 */}
        
        {Object.entries(formData).map(([key, value]) => {
          let label = '';
          let type = 'text';

          // key에 따른 레이블과 타입을 정의합니다.
          if (key === 'name') label = '이름';
          else if (key === 'dob') { label = '생년월일'; type = 'date'; }
          else if (key === 'email') { label = '이메일 주소'; type = 'email'; }
          else if (key === 'phone') { label = '전화번호'; type = 'tel'; }
          else if (key === 'username') label = '사용할 아이디';
          else if (key === 'password') { label = '비밀번호'; type = 'password'; }
          
          return (
            <div key={key} style={{ marginBottom: '15px' }}>
              <label htmlFor={key} style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
              <input 
                type={type} 
                id={key} 
                name={key} 
                value={value} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>
          );
        })}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
          <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <label htmlFor="terms">이용약관에 동의합니다.</label>
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white' }}>가입하기</button>
      </form>
    </div>
  );
}
