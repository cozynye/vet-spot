"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPlaceholder } from "@/widgets/test-map-placeholder/ui/MapPlaceholder";
import { HOSPITAL_STATS, SITE_INFO } from "@/shared/config/constants";

export default function Test3Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Transparent to Opaque */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Link
            href="/"
            className={`text-xl font-bold transition-colors ${
              scrolled ? "text-hospital-primary" : "text-hospital-foreground"
            }`}
          >
            동물병원 찾기
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/search-map"
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-hospital-foreground hover:text-hospital-primary"
                  : "text-hospital-foreground hover:text-hospital-primary"
              }`}
            >
              병원 검색
            </Link>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-hospital-foreground hover:text-hospital-primary"
                  : "text-hospital-foreground hover:text-hospital-primary"
              }`}
            >
              홈으로
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Center-Focused */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-3xl w-full text-center">
          <div className="inline-block px-4 py-2 border border-hospital-primary/30 rounded-full mb-8">
            <span className="text-sm text-hospital-primary">
              전국 {HOSPITAL_STATS.totalFormatted}개 동물병원
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-hospital-primary via-hospital-secondary to-hospital-accent bg-clip-text text-transparent">
              우리 아이,
            </span>
            <br />
            <span className="text-hospital-foreground">가까운 병원</span>
          </h1>

          <p className="text-xl text-hospital-muted mb-12 leading-relaxed">
            24시간 응급부터 일반 진료까지
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="지역명, 건물명, 도로명 주소..."
              className="w-full px-6 py-5 rounded-full border border-gray-300 focus:border-hospital-primary focus:outline-none text-base"
            />
            <Link
              href="/search-map"
              className="absolute right-2 top-2 bottom-2 px-8 bg-hospital-primary text-white rounded-full font-medium hover:bg-hospital-primary/90 transition-colors flex items-center justify-center"
            >
              검색
            </Link>
          </div>

          {/* Map Preview */}
          <div className="max-w-md mx-auto">
            <MapPlaceholder height="400px" />
          </div>
        </div>
      </section>

      {/* Stats Section - Inline Text */}
      <section className="py-32 px-6 bg-hospital-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-12">
            <div>
              <div className="text-7xl md:text-8xl font-bold text-hospital-foreground mb-4">
                {HOSPITAL_STATS.totalFormatted}
              </div>
              <div className="text-xl text-hospital-muted">
                전국 동물병원 데이터베이스
              </div>
            </div>

            <div className="w-px h-16 bg-gray-300 mx-auto" />

            <div>
              <div className="text-7xl md:text-8xl font-bold text-hospital-foreground mb-4">
                {HOSPITAL_STATS.emergency24h}
              </div>
              <div className="text-xl text-hospital-muted">
                24시간 응급 동물병원
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section - Vertical List */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-20">
            <span className="bg-gradient-to-r from-hospital-primary to-hospital-secondary bg-clip-text text-transparent">
              이용 가이드
            </span>
          </h2>

          <div className="space-y-16">
            {/* Guide 1 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-hospital-primary/10 rounded-full flex items-center justify-center">
                <Image src="/icon/search.svg" alt="검색" width={28} height={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-hospital-foreground">
                  주소로 검색
                </h3>
                <p className="text-lg text-hospital-muted leading-relaxed">
                  지역명, 건물명, 도로명 주소로 원하는 위치를 검색하세요
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Guide 2 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-hospital-secondary/10 rounded-full flex items-center justify-center">
                <Image src="/icon/location.svg" alt="지도" width={28} height={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-hospital-foreground">
                  지도에서 확인
                </h3>
                <p className="text-lg text-hospital-muted leading-relaxed">
                  지도를 확대/축소하고 마커를 클릭하여 병원 정보를 확인하세요
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Guide 3 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-hospital-accent/10 rounded-full flex items-center justify-center">
                <Image src="/icon/hospital.svg" alt="병원" width={28} height={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-hospital-foreground">
                  상세 정보
                </h3>
                <p className="text-lg text-hospital-muted leading-relaxed">
                  병원 목록에서 이름, 주소, 전화번호 등을 확인하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-2xl font-bold text-hospital-primary mb-6">
            동물병원 찾기
          </div>
          <p className="text-hospital-muted mb-8">
            전국 동물병원 정보를 한눈에
          </p>
          <div className="text-sm text-hospital-muted">
            {SITE_INFO.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
