"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPlaceholder } from "@/widgets/test-map-placeholder/ui/MapPlaceholder";
import { HOSPITAL_STATS, SITE_INFO } from "@/shared/config/constants";

export default function Test4Page() {
  const [openAccordion, setOpenAccordion] = useState(0);

  return (
    <div className="min-h-screen bg-hospital-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-hospital-primary">
            동물병원 찾기
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/search-map" className="text-sm font-medium text-hospital-foreground hover:text-hospital-primary transition-colors">
              병원 검색
            </Link>
            <Link href="/" className="text-sm font-medium text-hospital-foreground hover:text-hospital-primary transition-colors">
              홈으로
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - 2x2 Grid Dashboard */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel 1: Service Intro */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="inline-block px-4 py-2 bg-hospital-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-hospital-primary">
                  동물병원 찾기 서비스
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-hospital-primary via-hospital-secondary to-hospital-accent bg-clip-text text-transparent">
                  우리 아이,
                </span>
                <br />
                <span className="text-hospital-foreground">가까운 병원</span>
              </h1>
              <p className="text-hospital-muted leading-relaxed">
                24시간 응급 동물병원부터 일반 진료까지, 우리 동네 반려동물 병원을 빠르게 찾아보세요
              </p>
            </div>

            {/* Panel 2: Map */}
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
              <MapPlaceholder height="300px" />
            </div>

            {/* Panel 3: Quick Stats */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
              <h3 className="text-lg font-semibold text-hospital-foreground mb-6">
                빠른 통계
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-hospital-muted">전국 동물병원</span>
                  <span className="text-2xl font-bold text-hospital-primary">
                    {HOSPITAL_STATS.totalFormatted}
                  </span>
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-hospital-muted">24시간 응급</span>
                  <span className="text-2xl font-bold text-hospital-accent">
                    {HOSPITAL_STATS.emergency24h}
                  </span>
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-hospital-muted">서비스 지역</span>
                  <span className="text-2xl font-bold text-hospital-secondary">
                    전국
                  </span>
                </div>
              </div>
            </div>

            {/* Panel 4: Search Bar */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-hospital-foreground mb-4">
                병원 검색하기
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="지역명, 건물명, 도로명 주소..."
                  className="w-full px-4 py-3 pr-28 rounded-lg border border-gray-200 focus:border-hospital-primary focus:outline-none text-sm"
                />
                <Link
                  href="/search-map"
                  className="absolute right-2 top-2 bottom-2 px-4 bg-hospital-primary text-white rounded-md font-medium hover:bg-hospital-primary/90 transition-colors flex items-center justify-center text-sm"
                >
                  검색
                </Link>
              </div>
              <p className="text-xs text-hospital-muted mt-3">
                지역명, 건물명, 도로명 주소로 검색할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - 4 Column Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-hospital-primary to-hospital-secondary bg-clip-text text-transparent">
              서비스 통계
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="p-6 bg-gradient-to-br from-hospital-primary/5 to-hospital-primary/10 rounded-xl border border-hospital-primary/20">
              <div className="w-12 h-12 bg-hospital-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Image src="/icon/hospital.svg" alt="병원" width={24} height={24} />
              </div>
              <div className="text-3xl font-bold text-hospital-foreground mb-1">
                {HOSPITAL_STATS.totalFormatted}
              </div>
              <div className="text-sm text-hospital-muted">
                총 병원 수
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-6 bg-gradient-to-br from-hospital-accent/5 to-hospital-accent/10 rounded-xl border border-hospital-accent/20">
              <div className="w-12 h-12 bg-hospital-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Image src="/icon/clock.svg" alt="24시" width={24} height={24} />
              </div>
              <div className="text-3xl font-bold text-hospital-foreground mb-1">
                {HOSPITAL_STATS.emergency24h}
              </div>
              <div className="text-sm text-hospital-muted">
                24시간 응급
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-6 bg-gradient-to-br from-hospital-secondary/5 to-hospital-secondary/10 rounded-xl border border-hospital-secondary/20">
              <div className="w-12 h-12 bg-hospital-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Image src="/icon/check.svg" alt="평점" width={24} height={24} />
              </div>
              <div className="text-3xl font-bold text-hospital-foreground mb-1">
                4.5
              </div>
              <div className="text-sm text-hospital-muted">
                평균 평점
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-6 bg-gradient-to-br from-hospital-primary/5 to-hospital-secondary/10 rounded-xl border border-hospital-primary/20">
              <div className="w-12 h-12 bg-hospital-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Image src="/icon/location.svg" alt="지역" width={24} height={24} />
              </div>
              <div className="text-3xl font-bold text-hospital-foreground mb-1">
                전국
              </div>
              <div className="text-sm text-hospital-muted">
                서비스 커버리지
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section - Accordion */}
      <section className="py-20 px-6 bg-hospital-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-hospital-primary to-hospital-secondary bg-clip-text text-transparent">
              이용 가이드
            </span>
          </h2>

          <div className="space-y-4">
            {/* Accordion 1 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 0 ? -1 : 0)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-hospital-background transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hospital-primary/10 rounded-lg flex items-center justify-center">
                    <Image src="/icon/search.svg" alt="검색" width={20} height={20} />
                  </div>
                  <span className="font-semibold text-hospital-foreground">
                    주소로 검색하기
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-hospital-muted transition-transform ${
                    openAccordion === 0 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === 0 && (
                <div className="px-6 pb-4 text-hospital-muted">
                  지역명, 건물명, 도로명 주소로 원하는 위치를 검색하세요. 검색 결과는 지도와 목록으로 확인할 수 있습니다.
                </div>
              )}
            </div>

            {/* Accordion 2 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 1 ? -1 : 1)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-hospital-background transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hospital-secondary/10 rounded-lg flex items-center justify-center">
                    <Image src="/icon/location.svg" alt="지도" width={20} height={20} />
                  </div>
                  <span className="font-semibold text-hospital-foreground">
                    지도에서 보기
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-hospital-muted transition-transform ${
                    openAccordion === 1 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === 1 && (
                <div className="px-6 pb-4 text-hospital-muted">
                  지도를 확대/축소하고 마커를 클릭하여 병원 정보를 확인하세요. 내 위치 기준으로 가까운 병원을 찾을 수 있습니다.
                </div>
              )}
            </div>

            {/* Accordion 3 */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 2 ? -1 : 2)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-hospital-background transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-hospital-accent/10 rounded-lg flex items-center justify-center">
                    <Image src="/icon/hospital.svg" alt="병원" width={20} height={20} />
                  </div>
                  <span className="font-semibold text-hospital-foreground">
                    병원 정보 확인
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-hospital-muted transition-transform ${
                    openAccordion === 2 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === 2 && (
                <div className="px-6 pb-4 text-hospital-muted">
                  병원 목록에서 이름, 주소, 전화번호 등 상세 정보를 확인하세요. 24시간 응급 병원 여부도 표시됩니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-xl font-bold text-hospital-primary mb-4">
            동물병원 찾기
          </div>
          <p className="text-sm text-hospital-muted mb-6">
            전국 동물병원 정보를 한눈에
          </p>
          <div className="text-xs text-hospital-muted">
            {SITE_INFO.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
