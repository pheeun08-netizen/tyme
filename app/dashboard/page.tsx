"use client";
import styles from "../home.module.css";

export default function LoginPage() {
  return (
    <div className={styles.authContainer}>
      <h2>로그인</h2>
      <form className={styles.authForm}>
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}