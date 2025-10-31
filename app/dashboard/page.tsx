export default function Dashboard() {
  const containerStyle: React.CSSProperties = {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#f4f7f9',
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '2px solid #ddd',
    paddingBottom: '15px',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px 30px',
    borderRadius: '8px',
  };

  const workspaceStyle: React.CSSProperties = {
    minHeight: '500px',
    border: '2px dashed #a0aec0',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#4a5568',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={{ fontSize: '2rem', color: '#2d3748' }}>🖥️ 내 프로그램 실행 창</h1>
      </header>
      <main>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>로그인이 성공적으로 완료되었으며, 이곳에서 프로그램을 실행할 수 있습니다.</p>
        
        <div style={workspaceStyle}>
          (여기에 실제 프로그램의 컴포넌트와 UI가 통합됩니다.)
        </div>
      </main>
    </div>
  );
}