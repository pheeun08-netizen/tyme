"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../home.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 form 제출 막기

    // 여기서 실제 인증 로직이나 API 호출 가능
    // 예시: 로그인 성공하면 /dashboard로 이동
    router.push("/dashboard");
  };

  return (
    <div className={styles.authContainer}>
      <h2>로그인</h2>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}