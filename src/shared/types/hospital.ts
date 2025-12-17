// 동물병원 정보 타입
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;

  // 상세 정보 (선택사항)
  businessHours?: string;
  closedDays?: string;
  specialties?: string[];
  vetCount?: number;
  facilitySize?: number;
  registrationNumber?: string;
  representative?: string;
}

// 좌표 타입
export interface Coordinates {
  lat: number;
  lng: number;
}

// 지도 상태 타입
export interface MapState {
  center: Coordinates;
  level: number;
  selectedHospital: Hospital | null;
  nearbyHospitals: Hospital[];
}

// API 응답 타입
export interface HospitalAPIResponse {
  hospitals: Hospital[];
  total: number;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}
