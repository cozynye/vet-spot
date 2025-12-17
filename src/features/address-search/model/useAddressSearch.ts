"use client";

import { useState, useCallback } from 'react';
import type { KakaoGeocoderResult, KakaoPlacesResult } from '@/types/kakao.maps';
import type {
  AddressSearchResult,
  UseAddressSearchReturn,
} from './types';

/**
 * 주소/키워드 검색 커스텀 훅
 * 1. 먼저 Places API로 키워드 검색 (건물명, 장소명 등) - 여러 결과 반환
 * 2. 결과가 없으면 Geocoder API로 주소 검색
 */
export function useAddressSearch(): UseAddressSearchReturn {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = useCallback(async (query: string): Promise<AddressSearchResult[]> => {
    if (!query.trim()) {
      setError('검색어를 입력해주세요');
      return [];
    }

    // Kakao Maps API 확인
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      setError('지도 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return [];
    }

    setIsSearching(true);
    setError(null);

    // 1단계: Places API로 키워드 검색 시도
    return new Promise((resolve) => {
      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(query, (placesResult: KakaoPlacesResult[], placesStatus: string) => {
        // 키워드 검색 성공 - 모든 결과 반환
        if (placesStatus === window.kakao.maps.services.Status.OK && placesResult.length > 0) {
          setIsSearching(false);

          // 최대 20개까지만 반환
          const results = placesResult.slice(0, 20).map((result) => ({
            name: result.place_name,
            address: result.address_name,
            coordinates: {
              lat: parseFloat(result.y),
              lng: parseFloat(result.x),
            },
            roadAddress: result.road_address_name,
            phone: result.phone,
            category: result.category_name,
          }));

          resolve(results);
        }
        // 키워드 검색 실패 → 2단계: Geocoder로 주소 검색 시도
        else {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(query, (geocoderResult: KakaoGeocoderResult[], geocoderStatus: string) => {
            setIsSearching(false);

            // 주소 검색 성공 - 단일 결과 반환
            if (geocoderStatus === window.kakao.maps.services.Status.OK && geocoderResult.length > 0) {
              const firstResult = geocoderResult[0];

              const searchResult: AddressSearchResult = {
                address: firstResult.address_name,
                coordinates: {
                  lat: parseFloat(firstResult.y),
                  lng: parseFloat(firstResult.x),
                },
                roadAddress: firstResult.road_address?.address_name,
                buildingName: firstResult.road_address?.building_name,
              };

              resolve([searchResult]);
            }
            // 모든 검색 실패
            else {
              setError('검색 결과가 없습니다. 주소나 장소명을 다시 확인해주세요.');
              resolve([]);
            }
          });
        }
      });
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    searchAddress,
    isSearching,
    error,
    clearError,
  };
}
