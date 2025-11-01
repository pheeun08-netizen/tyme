from flask import Flask, Response, jsonify
from flask_cors import CORS # CORS 설정을 위해 필요
import time
import random

app = Flask(__name__)
# Next.js 앱이 실행되는 포트(3000)에서 백엔드(5000)로 접근할 수 있도록 CORS 허용
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) 

# 실시간 데이터 스트림 엔드포인트
@app.route('/api/data_stream')
def data_stream():
    def generate_random_data():
        while True:
            # 1초마다 새로운 데이터 생성
            current_time = time.strftime('%H:%M:%S')
            random_value =5678# random.randint(1, 100)
            
            # 클라이언트로 보낼 데이터 (JSON 문자열)
            data_payload = {
                "timestamp": current_time,
                "value": random_value,
                "status": "LIVE"
            }
            
            # SSE 형식: data: <payload>\n\n
            import json
            yield f"data: {json.dumps(data_payload)}\n\n"
            time.sleep(1) # 1초 대기

    # Response 객체를 사용하여 'text/event-stream' 타입으로 반환
    return Response(generate_random_data(), mimetype='text/event-stream')

if __name__ == '__main__':
    # Flask 서버를 5000 포트에서 실행
    print("🚀 Flask Backend running on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
