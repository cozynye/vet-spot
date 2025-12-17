import type { Coordinates } from '@/shared/types/hospital';

/**
 * 동물병원 엔티티
 */
export interface Hospital {
  id: string; // 고유 ID (인허가번호 또는 생성된 ID)
  name: string; // 사업장명
  address: string; // 소재지 주소
  roadAddress?: string; // 도로명 주소
  coordinates: Coordinates; // 위도, 경도
  phone?: string; // 전화번호
  businessStatus?: string; // 영업 상태 (정상, 휴업, 폐업 등)
  licenseDate?: string; // 인허가일자
  category?: string; // 업종 분류
}

/**
 * 동물병원 검색 파라미터 (뷰포트 기준)
 */
export interface HospitalSearchParams {
  // 지도 경계 (남서쪽, 북동쪽 좌표)
  swLat: number; // South-West latitude
  swLng: number; // South-West longitude
  neLat: number; // North-East latitude
  neLng: number; // North-East longitude
}

/**
 * 동물병원 API 응답
 */
export interface HospitalSearchResponse {
  hospitals: Hospital[];
  total: number;
}
