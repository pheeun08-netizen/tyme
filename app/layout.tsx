import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: '네트워크 트래픽 분석 시스템',
  description: 'AI 기반 네트워크 보안 모니터링',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}