'use client';

import { useState, useEffect, useCallback } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from '@/features/hospital-map/hooks/useKakaoLoader';
import { useGeolocation } from '@/features/hospital-map/hooks/useGeolocation';
import { useHospitals } from '@/features/hospital-map/hooks/useHospitals';
import { SEOUL_CENTER } from '@/shared/config/constants';
import type { Coordinates } from '@/shared/types/hospital';
import type { Hospital } from '@/entities/hospital/model/types';

interface HospitalMapWithCircleProps {
  initialCenter?: Coordinates;
  searchMarker?: { position: Coordinates; name: string } | null;
  onLocationChange?: (location: Coordinates) => void;
  zoomLevel?: number;
}

export default function HospitalMapWithCircle({
  initialCenter = SEOUL_CENTER,
  searchMarker,
  onLocationChange,
  zoomLevel = 5,
}: HospitalMapWithCircleProps) {
  useKakaoLoader();

  const [center, setCenter] = useState(initialCenter);
  const [level, setLevel] = useState(zoomLevel);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
  const { location, isLoading, error, getCurrentLocation } = useGeolocation();
  const { hospitals, isLoading: isLoadingHospitals, loadHospitals } = useHospitals();

  // initialCenter prop 변경 시 center 업데이트 및 병원 로드
  useEffect(() => {
    if (initialCenter.lat !== center.lat || initialCenter.lng !== center.lng) {
      setCenter(initialCenter);
      loadHospitals(initialCenter);
    }
  }, [initialCenter.lat, initialCenter.lng]);

  // zoomLevel prop 변경 시 level 업데이트
  useEffect(() => {
    setLevel(zoomLevel);
  }, [zoomLevel]);

  // 현재 위치로 이동
  const handleMoveToCurrentLocation = () => {
    getCurrentLocation();
  };

  // location이 변경되면 지도 중심 이동
  useEffect(() => {
    if (location) {
      setCenter(location);
      setLevel(4);
      onLocationChange?.(location);
    }
  }, [location, onLocationChange]);

  // 줌 레벨에 따른 Circle 반경 계산 (미터 단위)
  const getRadiusForZoomLevel = (zoomLevel: number): number => {
    if (zoomLevel <= 1) return 50;
    if (zoomLevel <= 2) return 100;
    if (zoomLevel <= 3) return 200;
    if (zoomLevel <= 4) return 300;
    if (zoomLevel <= 5) return 500;
    if (zoomLevel <= 6) return 700;
    if (zoomLevel <= 7) return 1000;
    if (zoomLevel <= 8) return 1500;
    if (zoomLevel <= 9) return 2000;
    if (zoomLevel <= 10) return 3000;
    if (zoomLevel <= 11) return 5000;
    if (zoomLevel <= 12) return 7000;
    if (zoomLevel <= 13) return 10000;
    return 15000;
  };

  // Circle 생성/업데이트 함수 - 항상 지도의 현재 중심에 고정
  const updateCircle = useCallback((map: kakao.maps.Map, zoomLevel: number) => {
    // 기존 Circle 제거
    if (circle) {
      circle.setMap(null);
    }

    // 지도의 현재 중심 좌표 가져오기
    const mapCenter = map.getCenter();
    const radius = getRadiusForZoomLevel(zoomLevel);

    // 새 Circle 생성
    const newCircle = new kakao.maps.Circle({
      center: mapCenter, // 지도의 현재 중심 사용
      radius: radius,
      strokeWeight: 2,
      strokeColor: '#10b981',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      fillColor: '#10b981',
      fillOpacity: 0.15,
    });

    newCircle.setMap(map);
    setCircle(newCircle);
  }, [circle]);

  // 지도 중심 변경 시 Circle 업데이트
  const handleCenterChanged = (map: kakao.maps.Map) => {
    updateCircle(map, map.getLevel());

    const latlng = map.getCenter();
    const newCenter = {
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    };
    onLocationChange?.(newCenter);
  };

  // 지도 로드 시 병원 데이터 로드 및 Circle 생성
  useEffect(() => {
    if (map) {
      loadHospitals(center);
      updateCircle(map, level);
    }
  }, [map]);

  // 지도 이동 완료 시 병원 재로드
  const handleIdle = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    const newCenter = {
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    };
    loadHospitals(newCenter);
    updateCircle(map, map.getLevel()); // Circle도 업데이트
  };

  // 줌 레벨 변경 시 병원 재로드 및 Circle 업데이트
  const handleZoomChanged = (map: kakao.maps.Map) => {
    const newLevel = map.getLevel();
    setLevel(newLevel);
    const latlng = map.getCenter();
    const newCenter = {
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    };
    loadHospitals(newCenter);
    updateCircle(map, newLevel); // Circle 반경 업데이트
  };

  // 컴포넌트 언마운트 시 Circle 정리
  useEffect(() => {
    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [circle]);

  return (
    <div className="relative w-full h-full">
      {/* 지도 */}
      <Map
        id="hospital-map-with-circle"
        center={center}
        level={level}
        style={{
          width: '100%',
          height: '100%',
        }}
        onCreate={setMap}
        onCenterChanged={handleCenterChanged}
        onZoomChanged={handleZoomChanged}
        onIdle={handleIdle}
      >
        {/* 동물병원 마커 클러스터링 */}
        <MarkerClusterer
          averageCenter={true}
          minLevel={10}
          disableClickZoom={false}
          styles={[
            {
              width: '50px',
              height: '50px',
              background: 'rgba(16, 185, 129, 0.8)',
              borderRadius: '25px',
              color: '#fff',
              textAlign: 'center',
              lineHeight: '50px',
              fontSize: '14px',
              fontWeight: 'bold',
            },
          ]}
        >
          {hospitals.map((hospital) => (
            <MapMarker
              key={hospital.id}
              position={hospital.coordinates}
              clickable={true}
              onClick={() => setSelectedHospital(hospital)}
            >
              {selectedHospital?.id === hospital.id && (
                <div
                  style={{
                    padding: '10px',
                    color: '#000',
                    minWidth: '200px',
                    maxWidth: '300px',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {hospital.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>
                    {hospital.roadAddress || hospital.address}
                  </div>
                  {hospital.phone && (
                    <div style={{ fontSize: '12px', color: '#10b981', marginTop: '5px' }}>
                      📞 {hospital.phone}
                    </div>
                  )}
                </div>
              )}
            </MapMarker>
          ))}
        </MarkerClusterer>

        {/* 검색 결과 마커 */}
        {searchMarker && (
          <MapMarker
            position={searchMarker.position}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: {
                width: 24,
                height: 35,
              },
            }}
            zIndex={100}
          >
            <div style={{ padding: "5px", color: "#000" }}>
              {searchMarker.name}
            </div>
          </MapMarker>
        )}
      </Map>

      {/* 로딩 인디케이터 */}
      {isLoadingHospitals && (
        <div className="absolute top-4 right-4 z-10">
          <div className="card-glass px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-hospital-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-hospital-foreground">병원 로딩 중...</p>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="card-glass bg-red-50 border border-red-200 px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* 지도 컨트롤 */}
      <div className="absolute bottom-6 right-6 z-10 space-y-2">
        {/* 현재 위치로 이동 버튼 */}
        <button
          onClick={handleMoveToCurrentLocation}
          disabled={isLoading}
          className="w-12 h-12 rounded-full glass hover:bg-white/80 transition-all duration-300 shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
          aria-label="현재 위치로 이동"
          title="현재 위치로 이동"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-hospital-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-6 h-6 text-hospital-primary group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>

        {/* 줌 인 버튼 */}
        <button
          onClick={() => {
            if (map) {
              const newLevel = Math.max(map.getLevel() - 1, 1);
              map.setLevel(newLevel);
            }
          }}
          className="w-12 h-12 rounded-full glass hover:bg-white/80 transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center"
          aria-label="확대"
          title="확대"
        >
          <svg
            className="w-5 h-5 text-hospital-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* 줌 아웃 버튼 */}
        <button
          onClick={() => {
            if (map) {
              const newLevel = Math.min(map.getLevel() + 1, 14);
              map.setLevel(newLevel);
            }
          }}
          className="w-12 h-12 rounded-full glass hover:bg-white/80 transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center"
          aria-label="축소"
          title="축소"
        >
          <svg
            className="w-5 h-5 text-hospital-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
