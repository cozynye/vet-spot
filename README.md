# 🏥 전국 동물병원 찾기

> 전국 5,474개 동물병원, 24시간 응급 동물병원 319개를 지도에서 실시간으로 검색할 수 있는 웹 애플리케이션입니다.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📖 프로젝트 소개

반려동물 보호자들이 가장 가까운 동물병원을 빠르게 찾을 수 있도록 돕는 서비스입니다.
- 🗺️ **카카오 지도** 기반 실시간 병원 위치 표시
- 📍 **내 위치 기반** 주변 병원 자동 검색
- 🔍 **주소 검색** 기능으로 원하는 지역의 병원 찾기
- ⏰ **24시간 응급 병원** 정보 제공
- 📱 **모바일 최적화** 반응형 디자인

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18.17 이상
- pnpm 8.0 이상 (권장)

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/yourusername/animal-hospital.git
cd animal-hospital

# 2. 패키지 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열고 API 키를 입력하세요

# 4. 개발 서버 실행 (http://localhost:3011)
pnpm dev

# 5. 프로덕션 빌드
pnpm build

# 6. 프로덕션 서버 실행
pnpm start
```

### 환경 변수 설정

`.env.local` 파일에 다음 값을 설정하세요:

```env
# Kakao Maps API 키
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key

# 공공데이터 API 키 (동물병원 데이터)
PUBLIC_DATA_API_KEY=your_public_data_api_key

# Google AdSense (선택사항)
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx

# 베이스 URL (배포 시)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 🏗️ 기술 스택

### 핵심 기술

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| **Next.js** | 15.5 | - **App Router**: 최신 서버 컴포넌트와 스트리밍 지원<br>- **파일 기반 라우팅**: 직관적인 페이지 구조<br>- **자동 코드 스플리팅**: 페이지별 번들 최적화<br>- **Image 최적화**: 자동 WebP 변환 및 lazy loading<br>- **API Routes**: 서버리스 API 엔드포인트<br>- **SEO 최적화**: 메타데이터 API 및 sitemap 생성 |
| **TypeScript** | 5.9 | - **타입 안정성**: 런타임 에러 사전 방지<br>- **자동완성**: 개발 생산성 향상<br>- **코드 가독성**: 명시적 타입으로 의도 전달<br>- **리팩토링 안전성**: 타입 체크로 안전한 코드 변경 |
| **Tailwind CSS** | 3.4 | - **유틸리티 우선**: 빠른 스타일링<br>- **반응형 디자인**: 모바일 퍼스트 접근<br>- **번들 크기 최적화**: 사용하지 않는 CSS 자동 제거<br>- **일관된 디자인**: 디자인 시스템 기반 유틸리티 |
| **Kakao Maps SDK** | JavaScript API | - **한국 지도 최적화**: 정확한 한국 주소 및 POI 데이터<br>- **마커 클러스터링**: 대량 마커 성능 최적화<br>- **실시간 지도 조작**: 드래그, 줌, 터치 제스처 지원<br>- **커스텀 오버레이**: 병원 정보 표시 |

### 개발 도구

- **pnpm**: 빠른 패키지 설치 및 디스크 공간 절약
- **ESLint**: 코드 품질 및 일관성 유지
- **Pretendard 폰트**: 한글 가독성 최적화

## 📁 프로젝트 구조 (FSD 아키텍처)

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

### FSD란?

Feature-Sliced Design은 **확장 가능하고 유지보수하기 쉬운** 프론트엔드 아키텍처입니다.
- 📦 **계층화된 구조**: 비즈니스 로직을 명확하게 분리
- 🔒 **단방향 의존성**: 상위 계층 → 하위 계층만 참조 가능
- 🧩 **모듈화**: 기능별로 독립적인 모듈 구성

### 계층 구조

```
animal-hospital/
├── app/                        # 📍 Next.js App Router (라우팅)
│   ├── layout.tsx              # 루트 레이아웃 (메타데이터, SEO)
│   ├── page.tsx                # 메인 페이지 (/)
│   ├── sitemap.ts              # 동적 사이트맵 생성
│   ├── robots.ts               # 동적 robots.txt 생성
│   └── api/                    # API 라우트
│       └── hospitals/
│           └── route.ts        # 병원 데이터 API
│
└── src/                        # 🏗️ FSD 계층 구조
    ├── app/                    # 🔴 Layer 1: 앱 초기화 (최상위)
    │   ├── providers/          # Context, Theme 프로바이더
    │   └── styles/             # 전역 스타일 (globals.css)
    │
    ├── pages/                  # 🟠 Layer 2: 페이지 조합
    │   └── main/               # 메인 페이지 컴포넌트
    │       └── ui/             # 페이지 UI (MainPage.tsx)
    │
    ├── widgets/                # 🟡 Layer 3: 독립적 UI 블록
    │   ├── header/             # 헤더 위젯
    │   │   └── ui/             # Header.tsx
    │   ├── map-view/           # 지도 뷰 위젯
    │   │   └── ui/             # HospitalMap.tsx
    │   └── stats-section/      # 통계 섹션 위젯
    │       └── ui/
    │
    ├── features/               # 🟢 Layer 4: 사용자 기능
    │   ├── hospital-search/    # 🔍 병원 검색 기능
    │   │   ├── model/          # 검색 로직, 상태 관리
    │   │   └── ui/             # SearchBar.tsx
    │   ├── hospital-map/       # 🗺️ 지도 기능
    │   │   ├── hooks/          # useKakaoLoader, useGeolocation, useHospitals
    │   │   └── model/          # 지도 관련 타입
    │   ├── address-search/     # 📍 주소 검색 기능
    │   │   ├── model/          # 주소 검색 로직
    │   │   └── ui/             # SearchResultList.tsx
    │   └── location-share/     # 🔗 위치 공유 기능
    │       └── ui/
    │
    ├── entities/               # 🔵 Layer 5: 비즈니스 엔티티
    │   ├── hospital/           # 🏥 병원 엔티티
    │   │   ├── model/          # Hospital 타입, 스키마
    │   │   ├── api/            # 병원 API 호출 함수
    │   │   └── ui/             # HospitalCard.tsx
    │   └── location/           # 📌 위치 엔티티
    │       └── model/          # Coordinates 타입
    │
    └── shared/                 # ⚪ Layer 6: 공유 리소스 (최하위)
        ├── ui/                 # 공통 UI 컴포넌트 (Button, Card 등)
        ├── lib/                # 유틸리티 함수 (거리 계산 등)
        ├── api/                # API 기본 설정 (axios, fetch)
        ├── config/             # 상수 (SEOUL_CENTER 등)
        └── types/              # 공통 타입 정의
```

### 📐 FSD 계층 규칙

| 계층 | 역할 | Import 규칙 |
|------|------|-------------|
| 🔴 **app** | 앱 초기화, 프로바이더 | ⬇️ pages, widgets, features, entities, shared |
| 🟠 **pages** | 페이지 조합 | ⬇️ widgets, features, entities, shared |
| 🟡 **widgets** | 독립적 UI 블록 | ⬇️ features, entities, shared |
| 🟢 **features** | 사용자 상호작용 기능 | ⬇️ entities, shared |
| 🔵 **entities** | 비즈니스 엔티티 | ⬇️ shared |
| ⚪ **shared** | 공유 리소스 | ❌ 다른 계층 import 불가 |

**핵심 원칙**:
- ✅ **상위 계층 → 하위 계층만 import 가능** (단방향 의존성)
- ❌ **같은 계층 내에서는 import 불가** (순환 참조 방지)
- ✅ **shared는 모든 계층에서 사용 가능** (공통 리소스)

### 🔄 데이터 흐름 예시

**병원 검색 시나리오**:

```
사용자 입력 (SearchBar)
    ↓
features/hospital-search/ui/SearchBar.tsx
    ↓
features/address-search/model/useAddressSearch.ts (주소 검색)
    ↓
entities/hospital/api/fetchHospitalsByViewport (API 호출)
    ↓
widgets/map-view/ui/HospitalMap.tsx (지도에 마커 표시)
```

## 🎨 핵심 기능 구현

### 1. 카카오 지도 통합

**파일**: `src/widgets/map-view/ui/HospitalMap.tsx`

```typescript
// Kakao Maps SDK 동적 로딩
useKakaoLoader(); // 스크립트 비동기 로드

// 지도 이벤트 핸들링
<Map
  onCreate={setMap}           // 지도 생성 시
  onIdle={handleIdle}         // 드래그 완료 시 병원 재로드
  onZoomChanged={handleZoomChanged}  // 줌 변경 시
  onCenterChanged={handleCenterChange} // 중심 이동 시
>
```

**최적화 기법**:
- **Debouncing (300ms)**: API 호출 빈도 제한
- **Bounds 확장 (1.5배)**: 지도 이동 시 병원이 사라지지 않도록
- **MarkerClusterer**: 대량 마커 성능 최적화
- **onIdle 이벤트**: 드래그 완료 후에만 데이터 로드

### 2. 실시간 병원 검색

**파일**: `src/features/hospital-map/hooks/useHospitals.ts`

```typescript
const loadHospitals = useCallback((bounds: kakao.maps.LatLngBounds) => {
  // 300ms 디바운싱으로 과도한 API 호출 방지
  debounceTimerRef.current = setTimeout(async () => {
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const response = await fetchHospitalsByViewport({
      swLat: sw.getLat(),  // 남서쪽 위도
      swLng: sw.getLng(),  // 남서쪽 경도
      neLat: ne.getLat(),  // 북동쪽 위도
      neLng: ne.getLng(),  // 북동쪽 경도
    });

    setHospitals(response.hospitals);
  }, 300);
}, []);
```

### 3. 주소 검색 기능

**파일**: `src/features/address-search/model/useAddressSearch.ts`

```typescript
// Kakao Local API 활용
const searchAddress = async (query: string) => {
  const response = await axios.get(
    'https://dapi.kakao.com/v2/local/search/address.json',
    {
      params: { query },
      headers: { Authorization: `KakaoAK ${apiKey}` }
    }
  );

  // 결과가 1개면 바로 이동, 여러 개면 리스트 표시
  return response.data.documents;
};
```

### 4. 모바일 최적화

**viewport 설정** (`app/layout.tsx`):

```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,  // 모바일 입력 시 확대 방지
};
```

**반응형 디자인** (Tailwind CSS):

```jsx
<div className="px-4 md:px-6 lg:px-8">  {/* 화면 크기별 패딩 */}
<div className="grid grid-cols-1 md:grid-cols-2"> {/* 반응형 그리드 */}
```

## 🔧 API 구조

### 병원 데이터 API

**엔드포인트**: `GET /api/hospitals`

**쿼리 파라미터**:
- `swLat`: 남서쪽 위도
- `swLng`: 남서쪽 경도
- `neLat`: 북동쪽 위도
- `neLng`: 북동쪽 경도

**응답 예시**:

```json
{
  "hospitals": [
    {
      "id": "1",
      "name": "24시 동물병원",
      "address": "서울특별시 강남구 테헤란로 123",
      "roadAddress": "서울특별시 강남구 테헤란로 123",
      "phone": "02-1234-5678",
      "coordinates": {
        "lat": 37.5665,
        "lng": 126.9780
      }
    }
  ],
  "total": 15
}
```

## 🎯 성능 최적화

### 1. 번들 크기 최적화

- **코드 스플리팅**: 페이지별 자동 분할
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Dynamic Import**: 필요할 때만 컴포넌트 로드

```typescript
// Kakao Maps SDK 동적 로딩
const useKakaoLoader = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);
};
```

### 2. 이미지 최적화

- **Next.js Image 컴포넌트**: 자동 WebP 변환, lazy loading
- **반응형 이미지**: 화면 크기별 최적 이미지 제공

### 3. SEO 최적화

- **sitemap.xml**: 동적 사이트맵 생성
- **robots.txt**: 크롤러 접근 제어
- **메타 태그**: Open Graph, Twitter Card
- **구조화된 데이터**: JSON-LD (WebApplication 스키마)

## 🧪 테스트

```bash
# ESLint 검사
pnpm lint

# 타입 체크
pnpm type-check
```

## 📦 배포

### Vercel 배포 (권장)

1. Vercel에 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 완료

### 빌드 최적화

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 확인
ls -lh .next/static/chunks/
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트 관련 문의: [GitHub Issues](https://github.com/yourusername/animal-hospital/issues)

---

**Made with ❤️ for pet owners**
