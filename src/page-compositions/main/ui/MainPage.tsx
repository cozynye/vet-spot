'use client';

import { useState } from 'react';
import Header from '@/widgets/header/ui/Header';
import SearchBar from '@/features/hospital-search/ui/SearchBar';
import HospitalMap from '@/widgets/map-view/ui/HospitalMap';
import SearchResultList from '@/features/address-search/ui/SearchResultList';
import { useAddressSearch } from '@/features/address-search/model/useAddressSearch';
import type { Coordinates } from '@/shared/types/hospital';
import type { AddressSearchResult } from '@/features/address-search/model/types';
import { SEOUL_CENTER } from '@/shared/config/constants';

export default function MainPage() {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [mapCenter, setMapCenter] = useState<Coordinates>(SEOUL_CENTER);
  const [mapZoomLevel, setMapZoomLevel] = useState<number>(8); // 기본: 넓은 영역
  const [searchMarker, setSearchMarker] = useState<{ position: Coordinates; name: string } | null>(null);
  const [searchResults, setSearchResults] = useState<AddressSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { searchAddress, isSearching, error: searchError, clearError } = useAddressSearch();

  const handleSearch = async (query: string) => {
    console.log('검색:', query);
    clearError();

    // 주소 검색 실행
    const results = await searchAddress(query);

    if (results.length > 0) {
      console.log('검색 성공:', results.length, '개 결과');

      // 결과가 1개면 바로 이동, 여러 개면 리스트 표시
      if (results.length === 1) {
        handleSelectResult(results[0]);
      } else {
        setSearchResults(results);
        setShowResults(true);
      }
    }
  };

  const handleSelectResult = (result: AddressSearchResult) => {
    // 선택한 결과로 지도 중심 이동, 줌 레벨 4로 확대 (약 500m~1km 범위), 마커 표시
    setMapCenter(result.coordinates);
    setCurrentLocation(result.coordinates);
    setMapZoomLevel(4); // 검색 결과로 이동 시 자동 확대 (약 500m~1km)
    setSearchMarker({
      position: result.coordinates,
      name: result.name || result.address,
    });
    setShowResults(false);
    setSearchResults([]);
    console.log('선택한 결과:', result, '/ 줌 레벨: 4');
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const handleLocationClick = () => {
    console.log('내 위치로 이동');
    // TODO: 위치 이동 로직 구현
  };

  const handleLocationChange = (location: Coordinates) => {
    setCurrentLocation(location);
    console.log('위치 변경:', location);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <Header />

      {/* 검색바 */}
      <section className="bg-gradient-to-br from-hospital-primary/10 via-hospital-secondary/10 to-hospital-accent/10">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative">
            <SearchBar
              onSearch={handleSearch}
              onLocationClick={handleLocationClick}
            />

            {/* 검색 결과 리스트 */}
            {showResults && (
              <div className="w-full max-w-4xl mx-auto px-4 relative">
                <SearchResultList
                  results={searchResults}
                  onSelect={handleSelectResult}
                  onClose={handleCloseResults}
                />
              </div>
            )}
          </div>

          {/* 검색 에러 메시지 */}
          {searchError && (
            <div className="px-4 pb-4 animate-fade-in">
              <div className="card-glass bg-red-50 border border-red-200 px-4 py-3 rounded-lg max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-600">{searchError}</p>
                  <button
                    onClick={clearError}
                    className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                    aria-label="닫기"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 지도 영역 */}
      <section
        id="map"
        className="relative bg-white w-full"
        style={{ height: '600px' }}
      >
        <div className="max-w-[1200px] mx-auto px-[10px] h-full">
          <HospitalMap
            initialCenter={mapCenter}
            searchMarker={searchMarker}
            onLocationChange={handleLocationChange}
            zoomLevel={mapZoomLevel}
          />
        </div>
        {/* 검색 중 로딩 오버레이 */}
        {isSearching && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
            <div className="card-glass px-6 py-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-hospital-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-hospital-foreground font-medium">주소 검색 중...</p>
            </div>
          </div>
        )}
      </section>

      {/* 통계 섹션 (Placeholder) */}
      <section
        id="stats"
        className="py-16 bg-gradient-to-br from-hospital-background to-white"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              전국 동물병원 통계
            </h2>
            <p className="text-hospital-muted">
              실시간 동물병원 정보를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 통계 카드 1 */}
            <div className="card-glass animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-hospital-muted mb-2">
                    총 동물병원
                  </p>
                  <p className="text-3xl font-bold text-gradient">1,234</p>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 통계 카드 2 */}
            <div className="card-glass animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-hospital-muted mb-2">
                    24시 병원
                  </p>
                  <p className="text-3xl font-bold text-hospital-secondary">
                    156
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-soft flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 통계 카드 3 */}
            <div className="card-glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-hospital-muted mb-2">
                    이번 달 검색
                  </p>
                  <p className="text-3xl font-bold text-hospital-accent">
                    5,678
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 가이드 (Placeholder) */}
      <section id="guide" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              사용 가이드
            </h2>
            <p className="text-hospital-muted">
              동물병원 찾기 서비스 이용 방법
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 가이드 1 */}
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">위치 설정</h3>
              <p className="text-sm text-hospital-muted">
                내 위치를 허용하거나 원하는 지역을 검색하세요
              </p>
            </div>

            {/* 가이드 2 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-soft flex items-center justify-center shadow-glow-blue">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">병원 선택</h3>
              <p className="text-sm text-hospital-muted">
                지도에서 마커를 클릭하여 병원 정보를 확인하세요
              </p>
            </div>

            {/* 가이드 3 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">정보 공유</h3>
              <p className="text-sm text-hospital-muted">
                URL을 복사하여 다른 사람과 위치를 공유하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-hospital-foreground text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2024 동물병원 찾기. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
