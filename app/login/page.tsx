'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email && password) {
      // 로그인 성공 처리
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      toast.success('로그인 성공!')
      router.push('/home')
    } else {
      toast.error('이메일과 비밀번호를 입력해주세요.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔐 로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            로그인
          </button>
        </form>
        <div className="auth-link">
          계정이 없으신가요? <a href="/signup">회원가입</a>
        </div>
        <div className="auth-link">
          <a href="/">← 메인으로 돌아가기</a>
        </div>
      </div>
    </div>
  )
}