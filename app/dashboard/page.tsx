export default function Dashboard() {
  const containerStyle = {
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    backgroundColor: '#1e2025', // 배경색
    color: '#e0e0e0', // 기본 텍스트
    display: 'flex',
    flexDirection: 'column' as 'column', // TypeScript를 위한 타입 캐스팅
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    backgroundColor: '#2c2e33', // 헤더 배경
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    borderBottom: '1px solid #383a40',
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#8c9eff',
  };

  const navItemStyle = {
    color: '#c0c0c0',
    textDecoration: 'none',
    marginLeft: '20px',
    fontWeight: 500,
    transition: 'color 0.3s',
  };

  const mainStyle = {
    padding: '40px',
    flexGrow: 1,
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    color: '#e0e0e0',
    marginBottom: '20px',
    borderBottom: '2px solid #383a40',
    paddingBottom: '10px',
  };

  const workspaceStyle = {
    minHeight: '500px',
    border: '2px dashed #555',
    borderRadius: '10px',
    padding: '40px',
    textAlign: 'center' as 'center',
    fontSize: '1.5rem',
    color: '#777',
    backgroundColor: '#24262b', // 작업 영역 배경
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={logoStyle}>MyProgram</h1>
        <nav>
          <a href="#" style={navItemStyle}>대시보드</a>
          <a href="#" style={navItemStyle}>설정</a>
          <a href="/" style={{ ...navItemStyle, color: '#ff6666' }}>로그아웃</a>
        </nav>
      </header>
      <main style={mainStyle}>
        <h2 style={sectionTitleStyle}>프로그램 실행 환경</h2>
        <div style={workspaceStyle}>
          (여기에 당신의 프로그램의 복잡하고 멋진 UI가 통합됩니다.)
        </div>
      </main>
    </div>
  );
}