"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/features/hospital-search/ui/SearchBar";
import HospitalMap from "@/widgets/map-view/ui/HospitalMap";
import SearchResultList from "@/features/address-search/ui/SearchResultList";
import { useAddressSearch } from "@/features/address-search/model/useAddressSearch";
import type { Coordinates } from "@/shared/types/hospital";
import type { AddressSearchResult } from "@/features/address-search/model/types";
import type { Hospital } from "@/entities/hospital/model/types";
import { SEOUL_CENTER } from "@/shared/config/constants";

export default function SearchMapPage() {
  const searchParams = useSearchParams();
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<Coordinates>(SEOUL_CENTER);
  const [mapZoomLevel, setMapZoomLevel] = useState<number>(5);
  const [searchMarker, setSearchMarker] = useState<{
    position: Coordinates;
    name: string;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<AddressSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [visibleHospitals, setVisibleHospitals] = useState<Hospital[]>([]);
  const [showHospitalList, setShowHospitalList] = useState(false);
  const {
    searchAddress,
    isSearching,
    error: searchError,
    clearError,
  } = useAddressSearch();

  // URL 파라미터에서 검색어 가져와서 자동 검색
  useEffect(() => {
    const query = searchParams?.get("q");
    if (query && query !== searchQuery) {
      setSearchQuery(query);
      // 중복 검색 방지를 위해 즉시 lastSearchQuery 설정
      setLastSearchQuery(query);

      // URL에서 온 경우 직접 검색 실행 및 state 업데이트
      const performSearch = async (retryCount = 0) => {
        console.log(
          "URL에서 검색 제출:",
          query,
          retryCount > 0 ? `(재시도 ${retryCount}/3)` : ""
        );
        clearError();

        const results = await searchAddress(query);

        if (results.length > 0) {
          const result = results[0];
          console.log("검색 결과 첫 번째 항목:", result);

          // 직접 state 업데이트 (handleSelectResult 의존성 제거)
          setMapCenter(result.coordinates);
          setCurrentLocation(result.coordinates);
          setMapZoomLevel(4);
          setSearchMarker({
            position: result.coordinates,
            name: result.name || result.address,
          });
          setShowResults(false);
          setSearchResults([]);
          console.log("지도 이동 완료:", result.coordinates, "/ 줌 레벨: 4");
        } else if (retryCount < 3) {
          // 결과가 없고 재시도 횟수가 3회 미만이면 500ms 후 재시도
          console.log("검색 결과 없음, 500ms 후 재시도...");
          setTimeout(() => {
            performSearch(retryCount + 1);
          }, 500);
        } else {
          console.log("검색 재시도 최대 횟수 초과, 검색 실패");
        }
      };

      performSearch();
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    // 중복 검색 방지 - 같은 쿼리로 이미 검색했으면 스킵
    if (query === lastSearchQuery) {
      console.log("중복 검색 방지 - 스킵:", query);
      return;
    }

    // URL 업데이트
    window.history.pushState(
      null,
      "",
      `/search-map?q=${encodeURIComponent(query)}`
    );

    console.log("검색:", query);
    clearError();

    const results = await searchAddress(query);

    if (results.length > 0) {
      console.log("검색 성공:", results.length, "개 결과");
      setLastSearchQuery(query);

      if (results.length === 1) {
        handleSelectResult(results[0]);
      } else {
        setSearchResults(results);
        setShowResults(true);
      }
    }
  };

  const handleSearchSubmit = async (query: string) => {
    // URL 업데이트
    window.history.pushState(
      null,
      "",
      `/search-map?q=${encodeURIComponent(query)}`
    );

    console.log("검색 제출:", query);
    clearError();

    const results = await searchAddress(query);

    if (results.length > 0) {
      setLastSearchQuery(query); // 검색 기록
      handleSelectResult(results[0]);
    }
  };

  const handleSelectResult = (result: AddressSearchResult) => {
    console.log("handleSelectResult 호출됨:", result);

    setMapCenter(result.coordinates);
    setCurrentLocation(result.coordinates);
    setMapZoomLevel(4);
    setSearchMarker({
      position: result.coordinates,
      name: result.name || result.address,
    });

    // 리스트 숨기기
    setShowResults(false);
    setSearchResults([]);

    // 선택한 결과의 이름으로 검색어 및 URL 업데이트
    const selectedName = result.name || result.address;
    setSearchQuery(selectedName);
    setLastSearchQuery(selectedName); // 중복 검색 방지를 위해 기록
    window.history.pushState(
      null,
      "",
      `/search-map?q=${encodeURIComponent(selectedName)}`
    );

    console.log(
      "지도 이동 및 리스트 숨김 완료:",
      result.coordinates,
      "/ 줌 레벨: 4"
    );
  };

  const handleCloseResults = () => {
    console.log("handleCloseResults 호출됨");
    setShowResults(false);
    // 리스트만 닫고 검색어와 결과는 유지
  };

  const handleLocationClick = () => {
    console.log("내 위치로 이동");
    // TODO: 위치 이동 로직 구현
  };

  const handleLocationChange = (location: Coordinates) => {
    setCurrentLocation(location);
    console.log("위치 변경:", location);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 상단 헤더 바 */}
      <div className="absolute top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-[1400px] mx-auto px-4 tablet:px-6 pc:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 로고 & 제목 */}
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">상세 찾기</h1>
                <p className="text-xs text-hospital-muted hidden tablet:block">
                  주변 동물병원을 반경 기반으로 검색하세요
                </p>
              </div>
            </Link>

            {/* 홈으로 버튼 */}
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium glass hover:bg-white/50 transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="hidden tablet:inline">홈으로</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 검색바 (지도 위에 오버레이) */}
      <div className="absolute top-16 left-0 right-0 z-40 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              onSubmit={handleSearchSubmit}
              onLocationClick={handleLocationClick}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            />

            {/* 검색 결과 리스트 */}
            {showResults && isInputFocused && (
              <div className="mt-2 max-h-[500px] overflow-y-auto">
                <SearchResultList
                  results={searchResults}
                  onSelect={handleSelectResult}
                  onClose={handleCloseResults}
                />
              </div>
            )}

            {/* 검색 에러 메시지 */}
            {searchError && (
              <div className="mt-2 animate-fade-in">
                <div className="card-glass bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
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
        </div>
      </div>

      {/* 전체 화면 지도 */}
      <div className="flex-1 relative">
        <HospitalMap
          initialCenter={mapCenter}
          searchMarker={searchMarker}
          onLocationChange={handleLocationChange}
          onVisibleHospitalsChange={setVisibleHospitals}
          zoomLevel={mapZoomLevel}
        />

        {/* 검색 중 로딩 오버레이 */}
        {isSearching && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in">
            <div className="card-glass px-6 py-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-hospital-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-hospital-foreground font-medium">
                주소 검색 중...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 병원 리스트 토글 (좌측 하단) */}
      <div className="absolute bottom-6 left-6 z-30">
        {/* 병원 리스트 팝업 */}
        {showHospitalList && (
          <div className="mb-3 animate-fade-in">
            <div className="max-w-[70vw] card-glass overflow-hidden tablet:max-w-md w-[90vw] tablet:w-96">
              {/* 헤더 */}
              <div className="px-4 py-3 border-b border-white/20 bg-gradient-to-r from-hospital-primary/10 to-hospital-secondary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-hospital-primary/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-hospital-primary"
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
                    <div>
                      <h3 className="font-semibold text-hospital-foreground">
                        주변 동물병원
                      </h3>
                      <p className="text-xs text-hospital-muted">
                        {visibleHospitals.length}개 병원
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 병원 리스트 */}
              <div className="max-h-[40vh] tablet:max-h-[60vh] overflow-y-auto">
                {visibleHospitals.length === 0 ? (
                  <div className="px-2.5 tablet:px-4 py-8 text-center text-hospital-muted">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-hospital-muted/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">이 지역에 등록된 병원이 없습니다</p>
                    <p className="text-xs mt-1">
                      지도를 이동하거나 확대해보세요
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/10">
                    {visibleHospitals.map((hospital) => (
                      <div
                        key={hospital.id}
                        className="px-2.5 tablet:px-4 py-2.5 tablet:py-3 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => {
                          // 병원 위치로 지도 이동
                          setMapCenter(hospital.coordinates);
                          setMapZoomLevel(4); // 확대

                          // 모바일에서만 팝업 닫기 (768px 이하)
                          if (window.innerWidth < 768) {
                            setShowHospitalList(false);
                          }
                        }}
                      >
                        <h4 className="font-medium text-hospital-foreground mb-1">
                          {hospital.name}
                        </h4>
                        <p className="text-xs text-hospital-muted mb-1">
                          📍 {hospital.roadAddress || hospital.address}
                        </p>
                        {hospital.phone && (
                          <p className="text-xs text-hospital-primary">
                            📞 {hospital.phone}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 토글 버튼 */}
        <button
          onClick={() => setShowHospitalList(!showHospitalList)}
          className="w-[50px] h-[50px] rounded-full glass hover:bg-white/80 transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center group relative"
          aria-label="병원 리스트"
          title={showHospitalList ? "병원 리스트 닫기" : "병원 리스트 열기"}
        >
          <svg
            className={`w-6 h-6 text-hospital-primary group-hover:scale-110 transition-transform ${
              showHospitalList ? "rotate-180" : ""
            }`}
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
          {/* 배지 - 병원 개수 */}
          {visibleHospitals.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hospital-primary text-white text-xs flex items-center justify-center font-bold shadow-lg">
              {visibleHospitals.length > 99 ? "99+" : visibleHospitals.length}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
