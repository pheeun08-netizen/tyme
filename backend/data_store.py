from datetime import datetime
import json
import os
from typing import List, Dict, Optional

class DataStore:
    """네트워크 분석 데이터 저장 관리"""
    
    def __init__(self, max_storage: int = 1000, persist_to_file: bool = False):
        self.analysis_data: List[Dict] = []
        self.max_storage = max_storage
        self.persist_to_file = persist_to_file
        self.storage_file = 'data/analysis_storage.json'
        
        # 파일에서 기존 데이터 로드
        if persist_to_file:
            self._load_from_file()
    
    def add_analysis(self, data: Dict) -> Dict:
        """새 분석 데이터 추가"""
        # 타임스탬프 추가
        data['received_at'] = datetime.now().isoformat()
        
        # 데이터 저장 (최신 데이터가 앞에)
        self.analysis_data.insert(0, data)
        
        # 오래된 데이터 삭제
        if len(self.analysis_data) > self.max_storage:
            self.analysis_data = self.analysis_data[:self.max_storage]
        
        # 파일로 저장 (옵션)
        if self.persist_to_file:
            self._save_to_file()
        
        return {
            'status': 'success',
            'stored_count': len(self.analysis_data),
            'total_threats': data.get('total_threats', 0)
        }
    
    def get_all(self, limit: int = 100) -> List[Dict]:
        """전체 분석 데이터 조회"""
        return self.analysis_data[:limit]
    
    def get_latest(self) -> Optional[Dict]:
        """최신 분석 데이터 조회"""
        return self.analysis_data[0] if self.analysis_data else None
    
    def get_stats(self) -> Dict:
        """통계 데이터 계산"""
        if not self.analysis_data:
            return {
                'total_traffic': '0 GB',
                'total_threats': 0,
                'blocked_access': 0,
                'security_score': 100
            }
        
        latest = self.analysis_data[0]
        # 중첩된 data 구조 처리
        results = latest.get('data', [])
        
        # 위협 계산
        total_threats = 0
        blocked = 0
        
        for r in results:
            llm_text = r.get('llm_analysis', '{}')
            try:
                llm = json.loads(llm_text) if isinstance(llm_text, str) else llm_text
                if llm.get('status') == 'suspicious':
                    total_threats += 1
                if llm.get('action') == 'block':
                    blocked += 1
            except:
                pass
        
        # 보안 점수 계산
        security_score = max(0, 100 - (total_threats * 2))
        
        # 트래픽 계산
        total_packets = sum(len(a.get('data', [])) for a in self.analysis_data[:10])
        traffic_gb = round(total_packets * 0.001, 2)
        
        return {
            'total_traffic': f'{traffic_gb} GB',
            'total_threats': total_threats,
            'blocked_access': blocked,
            'security_score': security_score
        }
    
    def get_threats(self, limit: int = 100) -> List[Dict]:
        """위협 목록만 추출"""
        threats = []
        
        for analysis in self.analysis_data[:50]:
            # 중첩된 data 구조 처리
            results = analysis.get('data', [])
            for result in results:
                session = result.get('session', {})
                llm_text = result.get('llm_analysis', '{}')
                
                try:
                    llm = json.loads(llm_text) if isinstance(llm_text, str) else llm_text
                    
                    if llm.get('status') == 'suspicious':
                        threats.append({
                            'timestamp': result.get('timestamp'),
                            'source_ip': session.get('src_ip'),
                            'destination_ip': session.get('dst_ip'),
                            'protocol': 'TCP',
                            'reason': llm.get('reason', 'Unknown'),
                            'severity': llm.get('severity', 'medium'),
                            'action': llm.get('action', 'monitor')
                        })
                        
                        if len(threats) >= limit:
                            return threats
                except:
                    pass
        
        return threats
    
    def get_count(self) -> int:
        """저장된 분석 데이터 개수"""
        return len(self.analysis_data)
    
    def clear(self):
        """모든 데이터 삭제"""
        self.analysis_data = []
        if self.persist_to_file and os.path.exists(self.storage_file):
            os.remove(self.storage_file)
    
    def _save_to_file(self):
        """데이터를 파일로 저장"""
        try:
            os.makedirs('data', exist_ok=True)
            with open(self.storage_file, 'w', encoding='utf-8') as f:
                json.dump(self.analysis_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Failed to save to file: {e}")
    
    def _load_from_file(self):
        """파일에서 데이터 로드"""
        try:
            if os.path.exists(self.storage_file):
                with open(self.storage_file, 'r', encoding='utf-8') as f:
                    self.analysis_data = json.load(f)
                print(f"Loaded {len(self.analysis_data)} analyses from file")
        except Exception as e:
            print(f"Failed to load from file: {e}")
            self.analysis_data = []


# 싱글톤 인스턴스
_store_instance = None

def get_store(max_storage: int = 1000, persist_to_file: bool = False) -> DataStore:
    """DataStore 싱글톤 인스턴스 반환"""
    global _store_instance
    if _store_instance is None:
        _store_instance = DataStore(max_storage, persist_to_file)
    return _store_instance