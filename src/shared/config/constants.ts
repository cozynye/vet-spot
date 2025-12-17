// 서울 중심 좌표 (시청)
export const SEOUL_CENTER = {
  lat: 37.5665,
  lng: 126.978,
} as const;

// 기본 지도 설정
export const DEFAULT_MAP_LEVEL = 5;

// 반경 검색 기본값 (미터)
export const DEFAULT_RADIUS = 500;

// API 엔드포인트
export const API_ENDPOINTS = {
  hospitals: '/api/hospitals',
} as const;

// 병원 통계
export const HOSPITAL_STATS = {
  total: 5474,
  totalFormatted: '5,474',
  emergency24h: 319,
} as const;

// 사이트 정보
export const SITE_INFO = {
  name: '동물병원 찾기',
  title: '전국 동물병원 찾기 | 우리동네 동물병원 지도',
  description: '전국 동물병원을 지도에서 찾아보세요. 주소, 전화번호, 진료시간 정보 제공. 내 주변 동물병원 검색.',
} as const;
