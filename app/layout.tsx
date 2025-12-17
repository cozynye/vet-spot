import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '전국 동물병원 찾기 | 우리동네 동물병원 지도',
    template: '%s | 동물병원 찾기',
  },
  description:
    '전국 동물병원을 지도에서 쉽게 찾아보세요. 24시간 응급 동물병원, 주변 동물병원 검색, 진료시간, 위치, 전화번호 정보 제공. 반려동물을 위한 가장 빠른 동물병원 검색 서비스.',
  keywords: [
    '동물병원',
    '동물병원 찾기',
    '24시 동물병원',
    '응급 동물병원',
    '내 주변 동물병원',
    '반려동물 병원',
    '수의사',
    '애견병원',
    '애묘병원',
    '강아지 병원',
    '고양이 병원',
    '동물 진료',
    '반려동물 응급실',
    '동물병원 지도',
    '동물병원 검색',
  ],
  authors: [{ name: '동물병원 찾기', url: 'https://animal-hospital.com' }],
  creator: '동물병원 찾기',
  publisher: '동물병원 찾기',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3011'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '전국 동물병원 찾기 | 우리동네 동물병원 지도',
    description:
      '24시간 응급 동물병원부터 일반 동물병원까지! 지도에서 빠르게 찾고, 진료시간과 위치를 한눈에 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: '동물병원 찾기',
    images: [
      {
        url: '/icon/p-icon.png',
        width: 1200,
        height: 630,
        alt: '동물병원 찾기 - 전국 동물병원 지도 서비스',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '전국 동물병원 찾기',
    description:
      '24시간 응급 동물병원부터 일반 동물병원까지! 지도에서 빠르게 찾아보세요.',
    images: ['/icon/p-icon.png'],
    creator: '@animal_hospital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION || '',
    other: {
      'naver-site-verification': process.env.NAVER_VERIFICATION || '',
    },
  },
  icons: {
    icon: '/icon/p-icon.png',
    shortcut: '/icon/p-icon.png',
    apple: '/icon/p-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAdsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="ko" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Google AdSense (프로덕션에서만) */}
        {isProduction && googleAdsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

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
