# import requests
# from datetime import datetime

# print("=" * 60)
# print("📤 테스트 데이터 전송 중...")
# print("=" * 60)

# test_data = {
#     "timestamp": datetime.now().isoformat(),
#     "source": "manual_test",
#     "results": [
#         {
#             "timestamp": datetime.now().isoformat(),
#             "source_ip": "192.168.1.100",
#             "destination_ip": "8.8.8.8",
#             "protocol": "TCP",
#             "llm_analysis": {
#                 "status": "suspicious",
#                 "reason": "포트 스캔 시도 감지",
#                 "severity": "high",
#                 "action": "block"
#             }
#         },
#         {
#             "timestamp": datetime.now().isoformat(),
#             "source_ip": "10.0.0.50",
#             "destination_ip": "1.1.1.1",
#             "protocol": "UDP",
#             "llm_analysis": {
#                 "status": "suspicious",
#                 "reason": "비정상적인 DNS 쿼리",
#                 "severity": "medium",
#                 "action": "monitor"
#             }
#         },
#         {
#             "timestamp": datetime.now().isoformat(),
#             "source_ip": "172.16.0.25",
#             "destination_ip": "104.16.123.96",
#             "protocol": "HTTPS",
#             "llm_analysis": {
#                 "status": "suspicious",
#                 "reason": "알 수 없는 도메인 접속 시도",
#                 "severity": "low",
#                 "action": "monitor"
#             }
#         }
#     ],
#     "total_threats": 3,
#     "suspicious_count": 3
# }

# try:
#     print(f"Target: http://localhost:5000/api/upload\n")
    
#     response = requests.post(
#         "http://localhost:5000/api/upload",
#         json=test_data,
#         timeout=5
#     )
    
#     print(f"✅ Status Code: {response.status_code}")
#     print(f"📄 Response: {response.json()}\n")
    
#     if response.status_code == 200:
#         print("=" * 60)
#         print("🎉 테스트 성공!")
#         print("http://localhost:3000/main 에서 확인하세요!")
#         print("(3초 후 자동으로 화면이 업데이트됩니다)")
#         print("=" * 60)
#     else:
#         print("❌ 전송 실패!")
        
# except requests.exceptions.ConnectionError:
#     print("❌ Flask 서버에 연결할 수 없습니다!")
#     print("Flask 서버가 실행 중인지 확인하세요: python app.py")
# except Exception as e:
#     print(f"❌ 오류 발생: {e}")