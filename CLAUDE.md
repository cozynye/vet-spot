# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**동물병원 찾기** - 수의사, 동물병원 원장, 수의대학생을 위한 전국 동물병원 검색 웹사이트

### ⚠️ 중요: 서비스 목적
**이 서비스는 반려동물 보호자가 아닌, 동물병원 관련 종사자(수의사, 병원장, 수의대생)를 위한 B2B 서비스입니다.**
- 타겟 고객: 동물병원 관련 종사자 (NOT 일반 반려동물 보호자)
- 목적: 동물병원 현황 파악, 경쟁사 분석, 시장 조사 등 전문가용 도구
- 콘텐츠 톤앤매너: 전문적이고 데이터 중심적인 접근

### 기술 스택
- **프레임워크**: Next.js 15 (App Router)
- **스타일**: Tailwind CSS
- **언어**: TypeScript
- **지도**: Kakao Maps JavaScript API
- **패키지 매니저**: pnpm

## 개발 명령어

```bash
# 패키지 설치 (최초 1회)
pnpm install

# 개발 서버 실행 (포트 3011)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint
```

## 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key
PUBLIC_DATA_API_KEY=your_public_data_api_key
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxx
```

## 프로젝트 구조 (FSD 아키텍처)

**Feature-Sliced Design** 아키텍처를 따릅니다. [공식 문서](https://feature-sliced.design/)

```
animal-hospital/
├── app/                        # Next.js App Router (라우팅)
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 메인 페이지 (src/pages/main 조합)
│   └── api/
│       └── hospitals/
│           └── route.ts        # API 라우트
│
└── src/                        # FSD 계층 구조
    ├── app/                    # 🔴 Layer: 앱 초기화
    │   ├── providers/          # Context, Theme 프로바이더
    │   └── styles/             # 전역 스타일
    │
    ├── pages/                  # 🟠 Layer: 페이지 조합
    │   └── main/               # 메인 페이지
    │       └── ui/             # 페이지 UI
    │
    ├── widgets/                # 🟡 Layer: 독립적 UI 블록
    │   ├── header/             # 헤더 위젯
    │   │   └── ui/
    │   ├── map-view/           # 지도 뷰 위젯
    │   │   └── ui/
    │   └── stats-section/      # 통계 섹션 위젯
    │       └── ui/
    │
    ├── features/               # 🟢 Layer: 사용자 기능
    │   ├── hospital-search/    # 병원 검색 기능
    │   │   ├── model/          # 검색 로직
    │   │   └── ui/             # 검색 UI
    │   ├── radius-filter/      # 반경 필터 기능
    │   │   ├── model/          # 필터링 로직
    │   │   └── ui/             # 필터 UI
    │   └── location-share/     # 위치 공유 기능
    │       └── ui/
    │
    ├── entities/               # 🔵 Layer: 비즈니스 엔티티
    │   ├── hospital/           # 병원 엔티티
    │   │   ├── model/          # 타입, 스키마
    │   │   ├── api/            # API 호출
    │   │   └── ui/             # 병원 카드 등
    │   └── location/           # 위치 엔티티
    │       └── model/          # 위치 타입, 로직
    │
    └── shared/                 # ⚪ Layer: 공유 리소스
        ├── ui/                 # 공통 UI 컴포넌트
        ├── lib/                # 유틸리티 (distance.ts 등)
        ├── api/                # API 기본 설정
        ├── config/             # 상수 (constants.ts)
        └── types/              # 공통 타입 정의
```

### FSD 계층 규칙
- **상위 계층은 하위 계층만 import 가능** (의존성 방향: 🔴 → ⚪)
- **같은 계층 내에서는 import 불가**
- **shared는 모든 계층에서 사용 가능**

## 핵심 기능

### 1. 카카오 지도 통합
- 전국 동물병원 마커 표시
- 사용자 위치 기반 초기화
- 마커 클릭 시 정보 표시

### 2. 반경 검색 (500m)
- Haversine Formula를 사용한 거리 계산
- 클라이언트 사이드에서 필터링
- Circle overlay로 반경 시각화

### 3. URL 공유
- 좌표를 URL 파라미터로 포함 (`?lat=37.5665&lng=126.978`)
- 브라우저 히스토리 API 사용

### 4. Google AdSense
- 헤더, 푸터, 사이드 섹션에 광고 배치
- 프로덕션 환경에서만 로드

## 코드 컨벤션

### Import 순서
```typescript
// 1. React/Next.js
import { useState, useCallback } from 'react';
import Link from 'next/link';

// 2. 외부 라이브러리
import { clsx } from 'clsx';

// 3. 내부 컴포넌트/훅
import { useKakaoMap } from '@/features/hospital-map/hooks/useKakaoMap';

// 4. 타입
import type { Hospital } from '@/features/hospital-map/types';
```

### 네이밍 규칙
- **컴포넌트**: PascalCase (`HospitalMap`)
- **파일**: PascalCase for 컴포넌트, camelCase for 유틸리티
- **타입/인터페이스**: PascalCase (`Hospital`, `Coordinates`)
- **상수**: UPPER_SNAKE_CASE (`SEOUL_CENTER`)

## 디자인 가이드

### 컬러 팔레트
```css
--primary: #10b981;        /* Green (수의학 연상) */
--secondary: #3b82f6;      /* Blue (신뢰감) */
--accent: #f59e0b;         /* Orange (활기) */
--background: #f8fafc;     /* Light background */
--foreground: #0f172a;     /* Dark text */
```

### 트렌디한 디자인 요소
- **Glassmorphism**: 반투명 배경 + blur 효과
- **Gradient**: 그라데이션 배경
- **Smooth Animations**: 부드러운 전환 효과
- **Modern Typography**: Pretendard 폰트

### 모바일 최적화
- 반응형 브레이크포인트: sm(400px), md(768px), lg(1024px)
- 터치 영역 최소 44x44px
- 스와이프 제스처 지원

## 주요 타입

```typescript
interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  businessHours?: string;
  closedDays?: string;
  specialties?: string[];
}

interface Coordinates {
  lat: number;
  lng: number;
}
```

## 배포

- **플랫폼**: Vercel
- **환경 변수**: Vercel Dashboard에서 설정
- **도메인**: TBD

## 참고 자료

- [Kakao Maps API](https://apis.map.kakao.com/web/)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [공공데이터포털](https://www.data.go.kr/)
