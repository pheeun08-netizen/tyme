"use client";
import styles from "../home.module.css";

export default function SignupPage() {
  return (
    <div className={styles.authContainer}>
      <h2>회원가입</h2>
      <form className={styles.authForm}>
        <input type="text" placeholder="이름" required />
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}