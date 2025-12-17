"use client";

import Link from "next/link";
import Image from "next/image";
import { HOSPITAL_STATS, SITE_INFO } from "@/shared/config/constants";

export default function Test2Page() {
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

      {/* Hero Section - Large Centered Card */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-3xl overflow-hidden bg-gray-400 min-h-[600px] flex items-center justify-center">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-hospital-primary/80 via-hospital-secondary/70 to-hospital-accent/60" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 py-12 max-w-3xl">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-sm font-medium text-white">
                  전국 {HOSPITAL_STATS.totalFormatted}개 동물병원
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                우리 아이를 위한
                <br />
                가까운 병원 찾기
              </h1>

              <p className="text-lg text-white/90 mb-8">
                24시간 응급 동물병원부터 일반 진료까지,
                <br />
                우리 동네 반려동물 병원을 빠르게 찾아보세요
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="지역명, 건물명, 도로명 주소 검색..."
                  className="w-full px-6 py-4 pr-32 rounded-xl border-none focus:outline-none text-base"
                />
                <Link
                  href="/search-map"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-hospital-primary text-white rounded-lg font-medium hover:bg-hospital-primary/90 transition-colors flex items-center justify-center"
                >
                  검색
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Glassmorphism Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Hospitals */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
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
                  <p className="text-sm text-hospital-muted mt-2">
                    믿을 수 있는 병원 정보
                  </p>
                </div>
              </div>
            </div>

            {/* 24h Emergency */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
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
                  <p className="text-sm text-hospital-muted mt-2">
                    긴급 상황 대비 가능
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section - Cards with Hover Effect */}
      <section className="py-20 px-6 bg-white">
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
            <div className="p-8 bg-hospital-background rounded-2xl border-2 border-transparent hover:border-hospital-primary hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-hospital-primary to-hospital-secondary rounded-xl flex items-center justify-center mb-4">
                <Image src="/icon/search.svg" alt="검색" width={28} height={28} className="brightness-0 invert" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hospital-foreground">
                주소로 검색하기
              </h3>
              <p className="text-hospital-muted leading-relaxed">
                지역명, 건물명, 도로명 주소로 원하는 위치를 검색하세요. 검색 결과는 지도와 목록으로 확인할 수 있습니다.
              </p>
            </div>

            {/* Guide 2 */}
            <div className="p-8 bg-hospital-background rounded-2xl border-2 border-transparent hover:border-hospital-secondary hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-hospital-secondary to-hospital-accent rounded-xl flex items-center justify-center mb-4">
                <Image src="/icon/location.svg" alt="지도" width={28} height={28} className="brightness-0 invert" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hospital-foreground">
                지도에서 보기
              </h3>
              <p className="text-hospital-muted leading-relaxed">
                지도를 확대/축소하고 마커를 클릭하여 병원 정보를 확인하세요. 내 위치 기준으로 가까운 병원을 찾을 수 있습니다.
              </p>
            </div>

            {/* Guide 3 */}
            <div className="p-8 bg-hospital-background rounded-2xl border-2 border-transparent hover:border-hospital-accent hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-hospital-accent to-hospital-primary rounded-xl flex items-center justify-center mb-4">
                <Image src="/icon/hospital.svg" alt="병원" width={28} height={28} className="brightness-0 invert" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hospital-foreground">
                병원 정보 확인
              </h3>
              <p className="text-hospital-muted leading-relaxed">
                병원 목록에서 이름, 주소, 전화번호 등 상세 정보를 확인하세요. 24시간 응급 병원 여부도 표시됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hospital-foreground text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-xl font-bold mb-4">
            동물병원 찾기
          </div>
          <p className="text-sm opacity-80 mb-6">
            전국 동물병원 정보를 한눈에
          </p>
          <div className="text-xs opacity-60">
            {SITE_INFO.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
