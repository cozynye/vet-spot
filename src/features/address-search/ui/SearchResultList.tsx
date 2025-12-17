'use client';

import type { AddressSearchResult } from '../model/types';

interface SearchResultListProps {
  results: AddressSearchResult[];
  onSelect: (result: AddressSearchResult) => void;
  onClose: () => void;
}

export default function SearchResultList({
  results,
  onSelect,
  onClose,
}: SearchResultListProps) {
  if (results.length === 0) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* 검색 결과 리스트 */}
      <div className="absolute top-full left-0 right-0 mt-0.5 z-50 animate-slide-down mx-[10px] tablet:mx-0">
        <div
          className="glass rounded-xl shadow-xl max-h-[400px] tablet:max-h-[500px] overflow-y-auto p-[10px] tablet:p-3"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#10b981 transparent',
          }}
        >
          <p className="text-xs tablet:text-sm text-hospital-muted mb-2 font-medium">
            검색 결과 {results.length}개
          </p>
          <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSelect(result)}
                    className="w-full text-left px-3 py-2.5 tablet:py-3 rounded-lg hover:bg-hospital-primary/10 active:bg-hospital-primary/20 transition-all duration-200 active:scale-98"
                  >
                    <div className="flex items-start gap-2 tablet:gap-3">
                      {/* 아이콘 */}
                      <div className="flex-shrink-0 mt-0.5">
                        <svg
                          className="w-5 h-5 tablet:w-6 tablet:h-6 text-hospital-primary"
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

                      {/* 정보 */}
                      <div className="flex-1 min-w-0">
                        {/* 장소명 */}
                        {result.name && (
                          <p className="text-sm tablet:text-base font-medium text-hospital-foreground mb-0.5 truncate">
                            {result.name}
                          </p>
                        )}

                        {/* 주소 */}
                        <p className="text-xs tablet:text-sm text-hospital-muted truncate leading-relaxed">
                          {result.roadAddress || result.address}
                        </p>

                        {/* 카테고리 */}
                        {result.category && (
                          <p className="text-xs tablet:text-sm text-hospital-primary/70 mt-0.5 truncate">
                            {result.category}
                          </p>
                        )}
                      </div>

                      {/* 화살표 */}
                      <div className="flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 tablet:w-5 tablet:h-5 text-hospital-muted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
