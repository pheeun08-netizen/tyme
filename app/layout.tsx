import './globals.css';
import Header from './components/Header';
import { AuthProvider } from './lib/auth-context';


// 메타데이터는 Next.js 서버 컴포넌트에서만 사용됩니다.
export const metadata = {
  title: 'AI 경비 시스템',
  description: 'AI 기반 네트워크 보안 트래픽 분석 대시보드',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* AuthProvider로 전체 앱을 감싸서 Context를 제공합니다. */}
        <AuthProvider>
          <Header />
          <main className="container" style={{ minHeight: 'calc(100vh - 64px)' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}