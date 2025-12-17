'use client';

import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export function useKakaoLoader() {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  // 디버깅: API 키 확인
  console.log('🗺️ Kakao Maps API Key:', apiKey);
  console.log('🔑 API Key 길이:', apiKey?.length);

  if (!apiKey) {
    console.error('❌ NEXT_PUBLIC_KAKAO_MAP_API_KEY가 설정되지 않았습니다!');
    return;
  }

  useKakaoLoaderOrigin({
    appkey: apiKey,
    libraries: ['clusterer', 'services'],
  });
}
