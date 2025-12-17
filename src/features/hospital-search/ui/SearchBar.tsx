'use client';

import { useState, useEffect, useRef } from 'react';
import type { SearchBarProps } from '../model/types';

export default function SearchBar({
  value: controlledValue,
  onChange,
  onSearch,
  onSubmit,
  onLocationClick,
  onFocus,
  onBlur,
  placeholder = '병원 이름이나 주소를 검색하세요...',
}: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Controlled vs Uncontrolled
  const query = controlledValue !== undefined ? controlledValue : internalQuery;
  const setQuery = onChange || setInternalQuery;

  // 타이핑 중 자동 검색 (디바운싱)
  useEffect(() => {
    // 이전 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 검색어가 2자 이상일 때만 검색
    if (query.trim().length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch?.(query.trim());
      }, 500); // 500ms 대기 후 검색
    }

    // 클린업
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Enter 키로 제출 시 onSubmit 호출 (첫 번째 결과 선택)
      if (onSubmit) {
        onSubmit(query.trim());
      } else {
        onSearch?.(query.trim());
      }
    }
  };

  const handleLocationClick = () => {
    onLocationClick?.();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="card-glass animate-scale-in h-[50px] tablet:h-[70px]">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 h-full">
          {/* 검색 아이콘 */}
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-hospital-muted"
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
          </div>

          {/* 검색 입력 */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-hospital-foreground placeholder:text-hospital-muted text-base"
          />

          {/* 현재 위치 버튼 */}
          <button
            type="button"
            onClick={handleLocationClick}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-hospital-primary/10 text-hospital-primary transition-all duration-300 active:scale-95"
            aria-label="내 위치"
            title="내 위치로 이동"
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* 검색 버튼 */}
          <button
            type="submit"
            className="flex-shrink-0 px-4 py-2 tablet:px-6 tablet:py-2.5 rounded-lg gradient-primary text-white font-medium shadow-glow hover:opacity-90 transition-all duration-300 active:scale-95 text-sm tablet:text-base"
          >
            검색
          </button>
        </form>
      </div>
    </div>
  );
}
