"use client";

import { useEffect, useRef, useState } from "react";
import type { Coordinates } from "@/shared/types/hospital";
import { SEOUL_CENTER, DEFAULT_MAP_LEVEL } from "@/shared/config/constants";

interface UseKakaoMapProps {
  center?: Coordinates;
  level?: number;
}

export function useKakaoMap({
  center = SEOUL_CENTER,
  level = DEFAULT_MAP_LEVEL,
}: UseKakaoMapProps = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Kakao Maps SDK 로드 대기
    const checkKakaoMaps = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (!mapRef.current) return;

          const options = {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: level,
          };

          const mapInstance = new window.kakao.maps.Map(
            mapRef.current,
            options
          );
          setMap(mapInstance);
          setIsLoaded(true);
        });
      } else {
        setTimeout(checkKakaoMaps, 100);
      }
    };

    checkKakaoMaps();
  }, []);

  // 지도 중심 이동
  const moveCenter = (coordinates: Coordinates) => {
    if (map) {
      const moveLatLon = new window.kakao.maps.LatLng(
        coordinates.lat,
        coordinates.lng
      );
      map.setCenter(moveLatLon);
    }
  };

  // 지도 레벨 변경
  const setLevel = (newLevel: number) => {
    if (map) {
      map.setLevel(newLevel);
    }
  };

  return {
    mapRef,
    map,
    isLoaded,
    moveCenter,
    setLevel,
  };
}
