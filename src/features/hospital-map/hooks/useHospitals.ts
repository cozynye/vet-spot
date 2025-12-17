'use client';

import { useState, useCallback, useRef } from 'react';
import type { Hospital } from '@/entities/hospital/model/types';

interface UseHospitalsReturn {
  hospitals: Hospital[];
  isLoading: boolean;
  error: string | null;
  loadHospitals: (center: { lat: number; lng: number }) => void;
}

/**
 * 지도 뷰포트 기준 동물병원 데이터 로드 훅
 * Kakao Maps JavaScript SDK의 Places 서비스 사용
 * 디바운싱으로 API 호출 최적화
 */
export function useHospitals(): UseHospitalsReturn {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadHospitals = useCallback((center: { lat: number; lng: number }) => {
    // 이전 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 300ms 대기 후 검색 (디바운싱)
    debounceTimerRef.current = setTimeout(() => {
      setIsLoading(true);
      setError(null);

      try {
        // Kakao SDK 로드 확인
        if (typeof kakao === 'undefined' || !kakao.maps || !kakao.maps.services) {
          console.error('[useHospitals] Kakao Maps SDK not loaded');
          setError('지도 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
          setIsLoading(false);
          return;
        }

        // Kakao Places 서비스 생성
        const places = new kakao.maps.services.Places();

        // 검색 중심점 생성
        const searchCenter = new kakao.maps.LatLng(center.lat, center.lng);

        console.log(`[useHospitals] Searching near: ${center.lat}, ${center.lng}`);

        // 키워드로 장소 검색 (동물병원)
        places.keywordSearch(
          '동물병원',
          (result, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색 결과를 Hospital 타입으로 변환
              const hospitalList: Hospital[] = result.map((place) => ({
                id: place.id,
                name: place.place_name,
                address: place.address_name,
                roadAddress: place.road_address_name || place.address_name,
                coordinates: {
                  lat: parseFloat(place.y),
                  lng: parseFloat(place.x),
                },
                phone: place.phone || undefined,
                category: place.category_name,
              }));

              setHospitals(hospitalList);
              console.log(`[useHospitals] Loaded ${hospitalList.length} hospitals`);
              console.log(`[useHospitals] Total available: ${pagination?.totalCount || hospitalList.length}`);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              console.log('[useHospitals] No results found');
              setHospitals([]);
            } else if (status === kakao.maps.services.Status.ERROR) {
              console.error('[useHospitals] Search error');
              setError('동물병원 검색 중 오류가 발생했습니다.');
              setHospitals([]);
            }

            setIsLoading(false);
          },
          {
            location: searchCenter, // 중심 좌표
            radius: 20000, // 반경 20km
            size: 15, // 최대 15개 결과
          }
        );
      } catch (err) {
        console.error('[useHospitals] Error:', err);
        setError('동물병원 데이터를 불러오는데 실패했습니다.');
        setHospitals([]);
        setIsLoading(false);
      }
    }, 300); // 300ms 디바운스
  }, []);

  return {
    hospitals,
    isLoading,
    error,
    loadHospitals,
  };
}
