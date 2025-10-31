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
 
  const [formData, setFormData] = useState<FormData>({
    name: '', dob: '', email: '', phone: '', username: '', password: '',
  });
  const [agreed, setAgreed] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      alert('이용약관에 동의해야 합니다.');
      return;
    }
    // 실제 서버 통신 대신 Mock 로직을 수행합니다.
    console.log('회원가입 데이터:', formData);
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    router.push('/login');
  };


  // 인풋 필드 렌더링을 위한 맵 데이터
  const fields = [
    { key: 'name', label: '이름', type: 'text' },
    { key: 'dob', label: '생년월일', type: 'date' },
    { key: 'email', label: '이메일 주소', type: 'email' },
    { key: 'phone', label: '전화번호', type: 'tel' },
    { key: 'username', label: '사용할 아이디', type: 'text' },
    { key: 'password', label: '비밀번호', type: 'password' },
  ] as const;


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
        maxWidth: '450px',
        width: '100%',
        border: '1px solid #444',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#00cc66', fontSize: '1.8rem', fontWeight: 700 }}>회원가입</h2>
       
        {fields.map((field) => (
          <div key={field.key} style={{ marginBottom: '15px' }}>
            <label htmlFor={field.key} style={{ display: 'block', marginBottom: '8px', color: '#c0c0c0', fontWeight: 500 }}>{field.label}</label>
            <input
              type={field.type}
              id={field.key}
              name={field.key}
              // @ts-ignore
              value={formData[field.key]}
              onChange={handleChange}
              required
              style={inputStyle}
              // 포커스 시 테두리 색상 변경
              onFocus={(e) => e.currentTarget.style.borderColor = '#00cc66'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#555'}
            />
          </div>
        ))}
       
        {/* 약관 동의 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', marginBottom: '30px' }}>
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ width: '16px', height: '16px', backgroundColor: '#383a40', border: '1px solid #555', accentColor: '#00cc66'}}
          />
          <label htmlFor="terms" style={{ fontSize: '0.9rem', color: '#a0a0a0', cursor: 'pointer' }}>이용약관에 동의합니다.</label>
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
            backgroundColor: '#00cc66', // 가입 버튼 색상 (강조색)
            color: 'white',
            fontWeight: 700,
            transition: 'background-color 0.3s, transform 0.2s',
            boxShadow: '0 5px 15px rgba(0, 204, 102, 0.3)',
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#00b359'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#00cc66'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}