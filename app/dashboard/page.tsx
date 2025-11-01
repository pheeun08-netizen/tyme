"use client";
import styles from "../home.module.css";

type LogData = {
  id: number;
  timestamp: string;
  sourceIP: string;
  threatType: string;
  confidence: number;
};

export default function DashboardPage() {
  const logs: LogData[] = [
    { id: 1, timestamp: "2025-11-01 12:03", sourceIP: "192.168.0.42", threatType: "Spam Traffic", confidence: 92 },
    { id: 2, timestamp: "2025-11-01 12:05", sourceIP: "10.0.0.5", threatType: "Malware Signature", confidence: 97 },
    { id: 3, timestamp: "2025-11-01 12:07", sourceIP: "172.16.1.22", threatType: "XSS Injection", confidence: 89 },
    { id: 4, timestamp: "2025-11-01 12:10", sourceIP: "192.168.1.90", threatType: "SQL Injection", confidence: 95 },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h1>AI 트래픽 분석 결과</h1>
      <p>실시간으로 수집된 Wi-Fi 트래픽 데이터를 기반으로 탐지된 보안 위협 로그입니다.</p>

      <table className={styles.logTable}>
        <thead>
          <tr>
            <th>시간</th>
            <th>출발 IP</th>
            <th>탐지 유형</th>
            <th>신뢰도 (%)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.timestamp}</td>
              <td>{log.sourceIP}</td>
              <td>{log.threatType}</td>
              <td>{log.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}