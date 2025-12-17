"use client";

import { useState } from "react";
import Header from "@/widgets/header/ui/Header";
import HospitalMap from "@/widgets/map-view/ui/HospitalMap";
import type { Coordinates } from "@/shared/types/hospital";
import { SEOUL_CENTER } from "@/shared/config/constants";

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLocationChange = (location: Coordinates) => {
    console.log("위치 변경:", location);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <Header />

      {/* Hero 섹션 - 서비스 소개 & 지도 미리보기 */}
      <section className="py-16 bg-gradient-to-br from-hospital-background to-white tablet:py-8">
        <div className="max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-8">
          <div className="grid grid-cols-1 pc:grid-cols-2 gap-8 pc:gap-12 items-center">
            {/* 왼쪽: 서비스 설명 & 검색 */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-primary/10 border border-hospital-primary/20">
                <span className="text-sm font-medium text-hospital-primary">
                  전국 5,474개 동물병원
                </span>
              </div>

              <h2 className="text-4xl pc:text-5xl font-bold text-gradient leading-tight">
                우리 동네
                <br />
                동물병원 찾기
              </h2>

              <p className="text-lg text-hospital-muted leading-relaxed">
                전국의 동물병원 정보를 한눈에 확인하세요.
                <br />
                지도에서 간편하게 검색하고, 위치를 공유할 수 있습니다.
              </p>

              {/* 간단한 검색바 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="지역명으로 검색 (예: 서울시청, 강남역)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/search-map?q=${encodeURIComponent(
                        searchQuery.trim()
                      )}`;
                    }
                  }}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-hospital-primary focus:ring-2 focus:ring-hospital-primary/20 transition-all outline-none"
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      window.location.href = `/search-map?q=${encodeURIComponent(
                        searchQuery.trim()
                      )}`;
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-hospital-primary text-white hover:bg-hospital-primary/90 transition-colors"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">실시간 검색</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">위치 기반</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="text-sm font-medium">위치 공유</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 지도 미리보기 */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                style={{ height: "500px" }}
              >
                <HospitalMap
                  initialCenter={SEOUL_CENTER}
                  onLocationChange={handleLocationChange}
                  zoomLevel={5}
                  showLocationButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 섹션 (Placeholder) */}
      <section
        id="stats"
        className="py-16 bg-gradient-to-br from-hospital-background to-white"
      >
        <div className="max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              전국 동물병원 통계
            </h2>
            <p className="text-hospital-muted">
              실시간 동물병원 정보를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* 통계 카드 1 - 총 동물병원 */}
            <div className="card-glass animate-slide-up">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-hospital-muted mb-2">
                    총 동물병원
                  </p>
                  <p className="text-3xl font-bold text-gradient">5,474</p>
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
              <p className="text-xs text-hospital-muted">
                2025년 7월 기준, 행정안전부 인허가 데이터
              </p>
            </div>

            {/* 통계 카드 2 - 24시 동물병원 */}
            <div
              className="card-glass animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-hospital-muted mb-2">
                    24시 동물병원
                  </p>
                  <p className="text-3xl font-bold text-gradient">약 320+</p>
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
              <p className="text-xs text-hospital-muted">
                24시간 응급 진료 가능 병원
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 가이드 (Placeholder) */}
      <section id="guide" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              사용 가이드
            </h2>
            <p className="text-hospital-muted">
              동물병원 찾기 서비스 이용 방법
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8">
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
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-soft flex items-center justify-center shadow-glow-blue">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">병원 선택</h3>
              <p className="text-sm text-hospital-muted">
                지도에서 마커를 클릭하여 병원 정보를 확인하세요
              </p>
            </div>

            {/* 가이드 3 */}
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
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
        <div className="max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-8">
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
