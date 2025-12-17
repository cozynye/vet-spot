'use client';

import { useState, useCallback, useRef } from 'react';
import { fetchHospitalsByViewport } from '@/entities/hospital/api/hospitalApi';
import type { Hospital } from '@/entities/hospital/model/types';

interface UseHospitalsReturn {
  hospitals: Hospital[];
  isLoading: boolean;
  error: string | null;
  loadHospitals: (bounds: kakao.maps.LatLngBounds) => Promise<void>;
}

/**
 * 지도 뷰포트 기준 동물병원 데이터 로드 훅
 * 디바운싱으로 API 호출 최적화
 */
export function useHospitals(): UseHospitalsReturn {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadHospitals = useCallback(async (bounds: kakao.maps.LatLngBounds) => {
    // 이전 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 300ms 대기 후 API 호출 (디바운싱)
    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const sw = bounds.getSouthWest(); // 남서쪽 좌표
        const ne = bounds.getNorthEast(); // 북동쪽 좌표

        const response = await fetchHospitalsByViewport({
          swLat: sw.getLat(),
          swLng: sw.getLng(),
          neLat: ne.getLat(),
          neLng: ne.getLng(),
        });

        setHospitals(response.hospitals);
        console.log(`[useHospitals] Loaded ${response.hospitals.length} hospitals`);
        console.log(`[useHospitals] Total available: ${response.total}`);
      } catch (err) {
        console.error('[useHospitals] Error:', err);
        setError('동물병원 데이터를 불러오는데 실패했습니다.');
        setHospitals([]);
      } finally {
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
