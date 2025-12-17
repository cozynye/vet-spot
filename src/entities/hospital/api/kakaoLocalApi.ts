/**
 * Kakao Local API Client
 * 카카오 로컬 API를 사용하여 동물병원 검색
 */

interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
  place_url: string;
  distance: string;
}

interface KakaoLocalResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoPlace[];
}

export interface KakaoSearchParams {
  query: string; // 검색 키워드
  x?: number; // 중심 경도
  y?: number; // 중심 위도
  radius?: number; // 반경(미터, 0~20000)
  rect?: string; // 사각형 범위 (x1,y1,x2,y2)
  page?: number; // 페이지 번호 (1~45)
  size?: number; // 한 페이지에 보여질 문서 수 (1~15)
}

/**
 * 카카오 로컬 API로 장소 검색
 */
export async function searchKakaoLocal(
  params: KakaoSearchParams
): Promise<KakaoLocalResponse> {
  const apiKey = process.env.KAKAO_REST_API_KEY;

  if (!apiKey) {
    throw new Error('KAKAO_REST_API_KEY is not set');
  }

  const url = new URL('https://dapi.kakao.com/v2/local/search/keyword.json');

  // 쿼리 파라미터 추가
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Kakao Local API error: ${response.status}`);
  }

  return response.json();
}

/**
 * 카테고리로 장소 검색 (동물병원 전용)
 */
export async function searchAnimalHospitals(params: {
  x: number; // 중심 경도
  y: number; // 중심 위도
  radius?: number; // 반경 (미터)
  rect?: string; // 사각형 범위
  page?: number;
  size?: number;
}): Promise<KakaoLocalResponse> {
  // 카테고리 코드: PO2 (동물병원)
  // 또는 키워드로 "동물병원" 검색
  return searchKakaoLocal({
    query: '동물병원',
    ...params,
    size: params.size || 15, // 최대 15개
  });
}
