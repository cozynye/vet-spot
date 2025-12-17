import { Suspense } from 'react';
import SearchMapPage from '@/page-compositions/search-map/ui/SearchMapPage';

export const metadata = {
  title: '상세 찾기 - 동물병원 찾기',
  description: '주변 동물병원을 상세하게 검색하고 찾아보세요. 반경 기반 검색과 실시간 지도 정보를 제공합니다.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchMapPage />
    </Suspense>
  );
}
