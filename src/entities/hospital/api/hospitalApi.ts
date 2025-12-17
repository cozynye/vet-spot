import type { HospitalSearchParams, HospitalSearchResponse } from '../model/types';

/**
 * 뷰포트 범위 내 동물병원 목록 조회
 */
export async function fetchHospitalsByViewport(
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
