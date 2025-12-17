import type { Hospital, Coordinates } from '../types/hospital';

/**
 * Haversine Formula를 사용하여 두 좌표 간의 거리를 계산
 * @param lat1 첫 번째 지점의 위도
 * @param lng1 첫 번째 지점의 경도
 * @param lat2 두 번째 지점의 위도
 * @param lng2 두 번째 지점의 경도
 * @returns 거리 (미터 단위)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // 지구 반지름 (미터)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 미터 단위 거리
}

/**
 * 좌표로부터 반경 내에 있는 병원 필터링
 * @param hospitals 전체 병원 목록
 * @param center 중심 좌표
 * @param radiusMeters 반경 (미터)
 * @returns 반경 내 병원 목록
 */
export function filterHospitalsInRadius(
  hospitals: Hospital[],
  center: Coordinates,
  radiusMeters: number = 500
): Hospital[] {
  return hospitals.filter((hospital) => {
    const distance = calculateDistance(
      center.lat,
      center.lng,
      hospital.lat,
      hospital.lng
    );
    return distance <= radiusMeters;
  });
}

/**
 * 거리를 사람이 읽기 쉬운 형식으로 변환
 * @param meters 거리 (미터)
 * @returns 포맷된 거리 문자열
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}
