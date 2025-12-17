import type { Coordinates } from '@/shared/types/hospital';

// 주소 검색 결과 타입
export interface AddressSearchResult {
  name?: string; // 장소명 (키워드 검색 시)
  address: string;
  coordinates: Coordinates;
  roadAddress?: string;
  buildingName?: string;
  phone?: string;
  category?: string;
}

// 주소 검색 상태 타입
export interface AddressSearchState {
  isSearching: boolean;
  error: string | null;
  result: AddressSearchResult | null;
}

// 주소 검색 훅 반환 타입
export interface UseAddressSearchReturn {
  searchAddress: (query: string) => Promise<AddressSearchResult[]>;
  isSearching: boolean;
  error: string | null;
  clearError: () => void;
}
