export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>환영합니다! 홈 화면입니다. (/)</h1>
      <nav>
        <p><a href="/login">로그인 화면으로 이동</a></p>
        <p><a href="/signup">회원가입 화면으로 이동</a></p>
      </nav>
    </main>
  );
}
