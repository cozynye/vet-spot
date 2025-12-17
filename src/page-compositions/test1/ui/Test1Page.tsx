"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPlaceholder } from "@/widgets/test-map-placeholder/ui/MapPlaceholder";
import { HOSPITAL_STATS, SITE_INFO } from "@/shared/config/constants";

export default function Test1Page() {
  return (
    <div className="min-h-screen bg-hospital-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
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

      {/* Hero Section - 50/50 Split */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 md:py-0">
          <div className="max-w-xl">
            <div className="inline-block px-4 py-2 bg-hospital-primary/10 rounded-full mb-6">
              <span className="text-sm font-medium text-hospital-primary">
                전국 {HOSPITAL_STATS.totalFormatted}개 동물병원
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-hospital-primary via-hospital-secondary to-hospital-accent bg-clip-text text-transparent">
                우리 아이,
              </span>
              <br />
              <span className="text-hospital-foreground">
                가까운 병원 찾기
              </span>
            </h1>

            <p className="text-lg text-hospital-muted mb-8">
              24시간 응급 동물병원부터 일반 진료까지,
              <br />
              우리 동네 반려동물 병원을 빠르게 찾아보세요
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="지역명, 건물명, 도로명 주소 검색..."
                className="w-full px-6 py-4 pr-32 rounded-xl border-2 border-gray-200 focus:border-hospital-primary focus:outline-none text-base"
              />
              <Link
                href="/search-map"
                className="absolute right-2 top-2 bottom-2 px-6 bg-hospital-primary text-white rounded-lg font-medium hover:bg-hospital-primary/90 transition-colors flex items-center justify-center"
              >
                검색
              </Link>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-hospital-muted">
              <span className="flex items-center gap-1">
                <Image src="/icon/clock.svg" alt="24시" width={16} height={16} />
                24시 응급 {HOSPITAL_STATS.emergency24h}개
              </span>
              <span>•</span>
              <span>빠른 검색</span>
              <span>•</span>
              <span>상세 정보</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Map Placeholder */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <MapPlaceholder height="600px" className="w-full max-w-2xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Hospitals */}
            <div className="flex items-start gap-6 p-8 rounded-2xl border-2 border-gray-100 hover:border-hospital-primary/30 transition-colors">
              <div className="p-4 bg-gradient-to-br from-hospital-primary to-hospital-secondary rounded-xl">
                <Image src="/icon/hospital.svg" alt="병원" width={32} height={32} className="brightness-0 invert" />
              </div>
              <div>
                <div className="text-4xl font-bold text-hospital-foreground mb-2">
                  {HOSPITAL_STATS.totalFormatted}
                </div>
                <div className="text-hospital-muted">
                  전국 동물병원
                </div>
              </div>
            </div>

            {/* 24h Emergency */}
            <div className="flex items-start gap-6 p-8 rounded-2xl border-2 border-gray-100 hover:border-hospital-accent/30 transition-colors">
              <div className="p-4 bg-gradient-to-br from-hospital-accent to-hospital-primary rounded-xl">
                <Image src="/icon/clock.svg" alt="24시" width={32} height={32} className="brightness-0 invert" />
              </div>
              <div>
                <div className="text-4xl font-bold text-hospital-foreground mb-2">
                  {HOSPITAL_STATS.emergency24h}
                </div>
                <div className="text-hospital-muted">
                  24시간 응급 병원
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-20 px-6 bg-hospital-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-hospital-primary to-hospital-secondary bg-clip-text text-transparent">
              이용 가이드
            </span>
          </h2>
          <p className="text-center text-hospital-muted mb-12">
            동물병원 찾기 서비스 사용 방법을 안내합니다
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guide 1 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-hospital-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Image src="/icon/search.svg" alt="검색" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-hospital-foreground">
                주소로 검색하기
              </h3>
              <p className="text-sm text-hospital-muted">
                지역명, 건물명, 도로명 주소로 원하는 위치를 검색하세요
              </p>
            </div>

            {/* Guide 2 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-hospital-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Image src="/icon/location.svg" alt="지도" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-hospital-foreground">
                지도에서 보기
              </h3>
              <p className="text-sm text-hospital-muted">
                지도를 확대/축소하고 마커를 클릭하여 병원 정보를 확인하세요
              </p>
            </div>

            {/* Guide 3 */}
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-hospital-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Image src="/icon/hospital.svg" alt="병원" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-hospital-foreground">
                병원 정보 확인
              </h3>
              <p className="text-sm text-hospital-muted">
                병원 목록에서 이름, 주소, 전화번호 등 상세 정보를 확인하세요
              </p>
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
