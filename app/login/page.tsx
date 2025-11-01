"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../home.module.css";

export default function LoginPage({ onLogin }: { onLogin?: () => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 성공 가정
    if (onLogin) onLogin();
    router.push("/dashboard");
  };

  return (
    <div className={styles.authContainer}>
      <h2>로그인</h2>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}