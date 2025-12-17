'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 & 제목 */}
          <div className="flex items-center space-x-3">
            {/* 로고 아이콘 */}
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

            {/* 타이틀 */}
            <div>
              <h1 className="text-xl font-bold text-gradient hidden sm:block">
                동물병원 찾기
              </h1>
              <h1 className="text-lg font-bold text-gradient sm:hidden">
                동물병원
              </h1>
            </div>
          </div>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="/search-map"
              className="px-6 py-2.5 rounded-lg text-sm font-medium glass hover:bg-white/50 transition-all duration-300 flex items-center gap-2 border border-hospital-primary/20 shadow-sm hover:shadow-md"
            >
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-hospital-foreground font-semibold">상세 찾기</span>
            </a>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-all duration-300"
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 animate-slide-up">
          <div className="px-4 py-3">
            <a
              href="/search-map"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium glass hover:bg-white/10 transition-all duration-300 border border-hospital-primary/20"
              onClick={() => setIsMenuOpen(false)}
            >
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-white font-semibold">상세 찾기</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
