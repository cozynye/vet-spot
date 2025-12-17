"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/widgets/header/ui/Header";
import HospitalMap from "@/widgets/map-view/ui/HospitalMap";
import type { Coordinates } from "@/shared/types/hospital";
import { SEOUL_CENTER, HOSPITAL_STATS } from "@/shared/config/constants";

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
                  전국 {HOSPITAL_STATS.totalFormatted}개 동물병원
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
                  <Image
                    src="/icon/search.svg"
                    alt="검색"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Image
                    src="/icon/check.svg"
                    alt="체크"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-hospital-primary"
                  />
                  <span className="text-sm font-medium">실시간 검색</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Image
                    src="/icon/location.svg"
                    alt="위치"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-hospital-primary"
                  />
                  <span className="text-sm font-medium">위치 기반</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                  <Image
                    src="/icon/share.svg"
                    alt="공유"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-hospital-primary"
                  />
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
                  <p className="text-3xl font-bold text-gradient">{HOSPITAL_STATS.totalFormatted}</p>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Image
                    src="/icon/hospital.svg"
                    alt="병원"
                    width={24}
                    height={24}
                    className="w-6 h-6 text-white"
                  />
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
                  <Image
                    src="/icon/clock.svg"
                    alt="시계"
                    width={24}
                    height={24}
                    className="w-6 h-6 text-white"
                  />
                </div>
              </div>
              <p className="text-xs text-hospital-muted">
                24시간 응급 진료 가능 병원
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 가이드 - 상세 찾기 기능 */}
      <section id="guide" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              상세 찾기 기능 가이드
            </h2>
            <p className="text-hospital-muted">
              주소 검색부터 병원 정보 확인까지, 쉽고 빠르게 이용하세요
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8">
            {/* 가이드 1 - 주소 검색 */}
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                <Image
                  src="/icon/search.svg"
                  alt="검색"
                  width={32}
                  height={32}
                  className="w-8 h-8 text-white"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">주소로 검색하기</h3>
              <p className="text-sm text-hospital-muted mb-3">
                지역명, 건물명, 도로명 주소로 원하는 위치를 검색하세요
              </p>
              <div className="text-xs text-hospital-muted/70 bg-hospital-background rounded-lg px-3 py-2">
                예: 서울시청, 강남역, 판교역로 235
              </div>
            </div>

            {/* 가이드 2 - 지도에서 병원 확인 */}
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-soft flex items-center justify-center shadow-glow-blue">
                <Image
                  src="/icon/location.svg"
                  alt="위치"
                  width={32}
                  height={32}
                  className="w-8 h-8 text-white"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">지도에서 병원 보기</h3>
              <p className="text-sm text-hospital-muted mb-3">
                지도의 마커를 클릭하여 병원 상세 정보를 확인하세요
              </p>
              <div className="text-xs text-hospital-muted/70 bg-hospital-background rounded-lg px-3 py-2">
                병원명, 주소, 전화번호 정보 제공
              </div>
            </div>

            {/* 가이드 3 - 병원 리스트 */}
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-accent flex items-center justify-center shadow-glow">
                <Image
                  src="/icon/hospital.svg"
                  alt="병원"
                  width={32}
                  height={32}
                  className="w-8 h-8 text-white"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">병원 목록 확인</h3>
              <p className="text-sm text-hospital-muted mb-3">
                왼쪽 하단 버튼으로 주변 병원 목록을 한눈에 확인하세요
              </p>
              <div className="text-xs text-hospital-muted/70 bg-hospital-background rounded-lg px-3 py-2">
                클릭하면 해당 병원 위치로 이동
              </div>
            </div>
          </div>

          {/* 추가 팁 섹션 */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-hospital-primary/5 to-hospital-secondary/5 border border-hospital-primary/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-hospital-primary/10 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/icon/share.svg"
                  alt="공유"
                  width={20}
                  height={20}
                  className="w-5 h-5 text-hospital-primary"
                />
              </div>
              <div>
                <h4 className="font-semibold text-hospital-foreground mb-2">
                  💡 위치 공유 기능
                </h4>
                <p className="text-sm text-hospital-muted">
                  검색한 위치가 URL에 자동으로 저장됩니다. URL을 복사하여 다른 사람과 공유하면
                  같은 위치의 지도를 바로 볼 수 있습니다.
                </p>
              </div>
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
