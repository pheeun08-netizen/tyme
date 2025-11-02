from flask import Flask, request, jsonify
from flask_cors import CORS
from data_store import get_store

app = Flask(__name__)
CORS(app)

# DataStore 인스턴스 생성
# persist_to_file=True 로 설정하면 데이터가 파일로도 저장됨
store = get_store(max_storage=1000, persist_to_file=False)


@app.route('/')
def home():
    return jsonify({
        'status': 'running',
        'message': 'Network Analysis API Server',
        'stored_analyses': store.get_count()
    })


@app.route('/api/upload', methods=['POST'])
def upload_analysis():
    """팀원 컴퓨터에서 분석 데이터 수신"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = store.add_analysis(data)
        
        print(f"✓ Received analysis: {result['total_threats']} threats, "
              f"Total stored: {result['stored_count']}")
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/analysis', methods=['GET'])
def get_analysis():
    """프론트엔드에서 전체 분석 데이터 조회"""
    try:
        limit = int(request.args.get('limit', 100))
        data = store.get_all(limit)
        
        return jsonify({
            'status': 'success',
            'count': len(data),
            'data': data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/analysis/latest', methods=['GET'])
def get_latest_analysis():
    """최신 분석 데이터만 조회"""
    try:
        latest = store.get_latest()
        
        if not latest:
            return jsonify({
                'status': 'success',
                'data': None,
                'message': 'No data available'
            })
        
        return jsonify({
            'status': 'success',
            'data': latest
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """통계 데이터 조회"""
    try:
        stats = store.get_stats()
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/threats', methods=['GET'])
def get_threats():
    """위협 목록만 조회"""
    try:
        limit = int(request.args.get('limit', 100))
        threats = store.get_threats(limit)
        
        return jsonify({
            'status': 'success',
            'count': len(threats),
            'threats': threats
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/clear', methods=['POST'])
def clear_data():
    """모든 데이터 삭제 (테스트용)"""
    try:
        store.clear()
        return jsonify({
            'status': 'success',
            'message': 'All data cleared'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("="*60)
    print("Network Analysis API Server")
    print("="*60)
    print("Server running on: http://localhost:5000")
    print("API Endpoints:")
    print("  POST /api/upload          - Receive analysis data")
    print("  GET  /api/analysis        - Get all analysis data")
    print("  GET  /api/analysis/latest - Get latest analysis")
    print("  GET  /api/stats           - Get statistics")
    print("  GET  /api/threats         - Get threat list")
    print("  POST /api/clear           - Clear all data")
    print("="*60)
    print(f"Data storage: {'File-backed' if store.persist_to_file else 'In-memory'}")
    print(f"Max storage: {store.max_storage} analyses")
    print("="*60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)