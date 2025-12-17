/**
 * ⚠️ DEPRECATED: REST API 방식 (고정 IP 필요)
 *
 * Vercel 배포 시 고정 IP가 없어 사용 불가
 * 현재는 JavaScript SDK (Places 서비스)를 사용 중
 *
 * 추후 고정 IP 호스팅으로 변경 시 다시 활성화 가능
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { HospitalSearchParams, HospitalSearchResponse } from '../model/types';

/**
 * 뷰포트 범위 내 동물병원 목록 조회
 * @deprecated JavaScript SDK 방식으로 변경됨 (useHospitals.ts 참고)
 */
export async function fetchHospitalsByViewport_DISABLED(
  params: HospitalSearchParams
): Promise<HospitalSearchResponse> {
  const queryParams = new URLSearchParams({
    swLat: params.swLat.toString(),
    swLng: params.swLng.toString(),
    neLat: params.neLat.toString(),
    neLng: params.neLng.toString(),
  });

  const response = await fetch(`/api/hospitals?${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch hospitals');
  }

  return response.json();
}
