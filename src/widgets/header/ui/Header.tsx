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
              href="#map"
              className="px-4 py-2 rounded-lg text-sm font-medium text-hospital-foreground hover:bg-white/50 transition-all duration-300"
            >
              지도
            </a>
            <a
              href="#stats"
              className="px-4 py-2 rounded-lg text-sm font-medium text-hospital-foreground hover:bg-white/50 transition-all duration-300"
            >
              통계
            </a>
            <a
              href="#guide"
              className="px-4 py-2 rounded-lg text-sm font-medium text-hospital-foreground hover:bg-white/50 transition-all duration-300"
            >
              사용 가이드
            </a>
            <button className="btn-primary">
              내 위치로
            </button>
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
          <div className="px-4 py-3 space-y-2">
            <a
              href="#map"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              지도
            </a>
            <a
              href="#stats"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              통계
            </a>
            <a
              href="#guide"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              사용 가이드
            </a>
            <button
              className="w-full btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              내 위치로
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
