import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { HOSPITAL_STATS } from "@/shared/config/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "전국 동물병원 찾기 | 우리동네 동물병원 지도",
    template: "%s | 동물병원 찾기",
  },
  description:
    `전국 ${HOSPITAL_STATS.totalFormatted}개 동물병원을 지도에서 쉽게 찾아보세요. 24시간 응급 동물병원 ${HOSPITAL_STATS.emergency24h}개, 주변 동물병원 실시간 검색, 진료시간, 위치, 전화번호 정보 제공. 반려동물을 위한 가장 빠른 동물병원 검색 서비스.`,
  keywords: [
    "동물병원",
    "동물병원 찾기",
    "24시 동물병원",
    "응급 동물병원",
    "내 주변 동물병원",
    "반려동물 병원",
    "수의사",
    "애견병원",
    "애묘병원",
    "강아지 병원",
    "고양이 병원",
    "동물 진료",
    "반려동물 응급실",
    "동물병원 지도",
    "동물병원 검색",
    "동물병원 정보",
    "수의사 찾기",
    "반려동물 의료",
    "전국 동물병원",
    "동물병원 위치",
    "동물병원 전화번호",
    "24시간 동물병원",
    "야간 동물병원",
    "주말 동물병원",
  ],
  authors: [{ name: "동물병원 찾기", url: "https://animal-hospital.com" }],
  creator: "동물병원 찾기",
  publisher: "동물병원 찾기",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3011"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "전국 동물병원 찾기 | 우리동네 동물병원 지도",
    description:
      `전국 ${HOSPITAL_STATS.totalFormatted}개 동물병원, 24시간 응급 동물병원 ${HOSPITAL_STATS.emergency24h}개. 지도에서 빠르게 찾고, 진료시간과 위치를 한눈에 확인하세요. 반려동물 응급 상황에 가장 빠른 검색 서비스.`,
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "동물병원 찾기",
    images: [
      {
        url: "/icon/p-icon.png",
        width: 1200,
        height: 630,
        alt: `동물병원 찾기 - 전국 ${HOSPITAL_STATS.totalFormatted}개 동물병원 실시간 검색 서비스`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `전국 동물병원 찾기 | ${HOSPITAL_STATS.totalFormatted}개 병원 실시간 검색`,
    description:
      `24시간 응급 동물병원 ${HOSPITAL_STATS.emergency24h}개 포함. 지도에서 가장 가까운 동물병원을 빠르게 찾아보세요.`,
    images: ["/icon/p-icon.png"],
    creator: "@animal_hospital",
    site: "@animal_hospital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "mJkJTBBd_7dbU9mLZXwirvRk_8r34RENokY5OZPTz4A",
    other: {
      "naver-site-verification": "2e5b848eb70b30813b2ca45408a84b4bcdcf9beb",
    },
  },
  icons: {
    icon: "/icon/p-icon.png",
    shortcut: "/icon/p-icon.png",
    apple: "/icon/p-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-1818226442756268" />

        {/* JSON-LD 구조화된 데이터 */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />

        {/* Pretendard 폰트 (선택적) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

// JSON-LD 구조화된 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "전국 동물병원 찾기",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3011",
  description:
    `전국 ${HOSPITAL_STATS.totalFormatted}개 동물병원을 지도에서 쉽게 찾아보세요. 24시간 응급 동물병원, 주변 동물병원 실시간 검색 서비스.`,
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1247",
  },
  provider: {
    "@type": "Organization",
    name: "동물병원 찾기",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3011",
  },
};
