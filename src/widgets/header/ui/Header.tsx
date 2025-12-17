"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 & 제목 */}
          <div className="flex items-center space-x-3">
            {/* 로고 아이콘 */}
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-glow">
              <Image
                src="/icon/p-icon.png"
                alt="동물병원 찾기 로고"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 타이틀 */}
            <div>
              <h1 className="text-xl font-bold text-gradient hidden tablet:block">
                동물병원 찾기
              </h1>
              <h1 className="text-lg font-bold text-gradient tablet:hidden">
                동물병원 찾기
              </h1>
            </div>
          </div>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden tablet:flex items-center space-x-4">
            <a
              href="/search-map"
              className="px-6 py-2.5 rounded-lg text-sm font-medium glass hover:bg-white/50 transition-all duration-300 flex items-center gap-2 border border-hospital-primary/20 shadow-sm hover:shadow-md"
            >
              <Image src="/icon/search.svg" alt="검색" width={20} height={20} className="text-hospital-primary" />
              <span className="text-hospital-foreground font-semibold">
                상세 찾기
              </span>
            </a>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="tablet:hidden p-2 rounded-lg hover:bg-white/50 transition-all duration-300"
            aria-label="메뉴"
          >
            {isMenuOpen ? (
              <Image src="/icon/close.svg" alt="닫기" width={24} height={24} />
            ) : (
              <Image src="/icon/menu.svg" alt="메뉴" width={24} height={24} />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="tablet:hidden glass-dark border-t border-white/10 animate-slide-up">
          <div className="px-4 py-3">
            <a
              href="/search-map"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium glass hover:bg-white/10 transition-all duration-300 border border-hospital-primary/20"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image src="/icon/search.svg" alt="검색" width={20} height={20} />
              <span className="text-white font-semibold">상세 찾기</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
