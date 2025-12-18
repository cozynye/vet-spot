"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import HospitalMap from "@/widgets/map-view/ui/HospitalMap";
import { HOSPITAL_STATS, SITE_INFO, SEOUL_CENTER } from "@/shared/config/constants";

// Number count-up animation hook
function useCountUp(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);

  const animate = () => {
    const start = 0;
    const increment = end / (duration * 60); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  };

  return { count, animate };
}

export default function MainPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  const mapY = useTransform(scrollY, [0, 500], [0, -10]);

  // Stats section refs and animations
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const totalCount = useCountUp(HOSPITAL_STATS.total);
  const emergencyCount = useCountUp(HOSPITAL_STATS.emergency24h);

  useEffect(() => {
    if (statsInView) {
      totalCount.animate();
      emergencyCount.animate();
    }
  }, [statsInView]);

  // Guide section refs
  const guideRef = useRef(null);
  const guideInView = useInView(guideRef, { once: true, margin: "-100px" });

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-map?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search-map");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-hospital-background overflow-x-hidden">
      {/* Header with Fade-in */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-hospital-primary">
            동물병원 찾기
          </Link>
          <nav className="hidden md:flex gap-6">
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
              <Link href="/search-map" className="text-sm font-medium text-hospital-foreground hover:text-hospital-primary transition-colors">
                병원 검색
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-sm font-medium text-hospital-foreground hover:text-hospital-primary transition-colors">
                홈으로
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section - Asymmetric Layout with Parallax */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Gradient Blob */}
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }}
          className="absolute inset-0 bg-gradient-to-br from-hospital-primary/10 via-hospital-secondary/5 to-hospital-accent/10 -z-10"
        />

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            {/* Left Content - 60% (3/5 columns) with Parallax */}
            <motion.div
              style={{ y: heroY }}
              className="md:col-span-3 z-10"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="inline-block px-4 py-2 bg-hospital-primary/10 backdrop-blur-sm rounded-full mb-3 md:mb-6"
                >
                  <span className="text-xs md:text-sm font-medium text-hospital-primary">
                    전국 {HOSPITAL_STATS.totalFormatted}개 동물병원
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="block bg-gradient-to-r from-hospital-primary via-hospital-secondary to-hospital-accent bg-clip-text text-transparent"
                  >
                    우리 아이를 위한
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="block text-hospital-foreground"
                  >
                    가까운 병원
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg md:text-xl text-hospital-muted mb-8 leading-relaxed"
                >
                  24시간 응급 동물병원부터 일반 진료까지,
                  <br />
                  우리 동네 반려동물 병원을 빠르게 찾아보세요
                </motion.p>

                {/* Search Bar with Hover Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative max-w-2xl"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="지역명, 건물명, 도로명 주소 검색..."
                    className="w-full px-6 py-4 pr-32 rounded-xl border-2 border-gray-200 focus:border-hospital-primary focus:outline-none text-base transition-all"
                  />
                  <motion.button
                    onClick={handleSearch}
                    whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.9)" }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-hospital-primary text-white rounded-lg font-medium transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    검색
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-6 flex gap-4 text-sm text-hospital-muted"
                >
                  <span className="flex items-center gap-1">
                    <Image src="/icon/clock.svg" alt="24시" width={16} height={16} />
                    24시 응급 {HOSPITAL_STATS.emergency24h}개
                  </span>
                  <span>•</span>
                  <span>빠른 검색</span>
                  <span>•</span>
                  <span>상세 정보</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Map - 40% (2/5 columns) with Slow Parallax */}
            <motion.div
              style={{ y: mapY }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                <HospitalMap
                  initialCenter={SEOUL_CENTER}
                  zoomLevel={5}
                  showLocationButton={false}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Count-up Animation */}
      <section ref={statsRef} className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Hospitals Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="p-8 rounded-2xl bg-gradient-to-br from-hospital-primary/5 to-hospital-secondary/5 border-2 border-hospital-primary/10 shadow-lg"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  animate={statsInView ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-4 bg-gradient-to-br from-hospital-primary to-hospital-secondary rounded-xl"
                >
                  <Image src="/icon/hospital.svg" alt="병원" width={32} height={32} className="brightness-0 invert" />
                </motion.div>
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-hospital-foreground mb-2">
                    {statsInView ? totalCount.count.toLocaleString() : "0"}
                  </div>
                  <div className="text-hospital-muted font-medium">
                    전국 동물병원
                  </div>
                  <p className="text-sm text-hospital-muted mt-2">
                    믿을 수 있는 병원 정보
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 24h Emergency Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="p-8 rounded-2xl bg-gradient-to-br from-hospital-accent/5 to-hospital-primary/5 border-2 border-hospital-accent/10 shadow-lg"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  animate={statsInView ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="p-4 bg-gradient-to-br from-hospital-accent to-hospital-primary rounded-xl"
                >
                  <Image src="/icon/clock.svg" alt="24시" width={32} height={32} className="brightness-0 invert" />
                </motion.div>
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-hospital-foreground mb-2">
                    {statsInView ? emergencyCount.count : "0"}
                  </div>
                  <div className="text-hospital-muted font-medium">
                    24시간 응급 병원
                  </div>
                  <p className="text-sm text-hospital-muted mt-2">
                    긴급 상황 대비 가능
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guide Section with Stagger Animation */}
      <section ref={guideRef} className="py-20 px-6 bg-hospital-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={guideInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-hospital-primary to-hospital-secondary bg-clip-text text-transparent">
                이용 가이드
              </span>
            </h2>
            <p className="text-center text-hospital-muted mb-12">
              동물병원 찾기 서비스 사용 방법을 안내합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guide 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={guideInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(16, 185, 129, 0.5)" }}
              className="p-8 bg-white rounded-2xl border-2 border-transparent shadow-sm hover:shadow-xl transition-all"
            >
              <motion.div
                animate={guideInView ? { rotate: [0, 10, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-14 h-14 bg-gradient-to-br from-hospital-primary to-hospital-secondary rounded-xl flex items-center justify-center mb-4"
              >
                <Image src="/icon/search.svg" alt="검색" width={28} height={28} className="brightness-0 invert" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-hospital-foreground">
                주소로 검색하기
              </h3>
              <p className="text-hospital-muted leading-relaxed">
                지역명, 건물명, 도로명 주소로 원하는 위치를 검색하세요. 검색 결과는 지도와 목록으로 확인할 수 있습니다.
              </p>
            </motion.div>

            {/* Guide 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={guideInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.5)" }}
              className="p-8 bg-white rounded-2xl border-2 border-transparent shadow-sm hover:shadow-xl transition-all"
            >
              <motion.div
                animate={guideInView ? { rotate: [0, -10, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="w-14 h-14 bg-gradient-to-br from-hospital-secondary to-hospital-accent rounded-xl flex items-center justify-center mb-4"
              >
                <Image src="/icon/location.svg" alt="지도" width={28} height={28} className="brightness-0 invert" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-hospital-foreground">
                지도에서 보기
              </h3>
              <p className="text-hospital-muted leading-relaxed">
                지도를 확대/축소하고 마커를 클릭하여 병원 정보를 확인하세요. 내 위치 기준으로 가까운 병원을 찾을 수 있습니다.
              </p>
            </motion.div>

            {/* Guide 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={guideInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(245, 158, 11, 0.5)" }}
              className="p-8 bg-white rounded-2xl border-2 border-transparent shadow-sm hover:shadow-xl transition-all"
            >
              <motion.div
                animate={guideInView ? { rotate: [0, 10, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-14 h-14 bg-gradient-to-br from-hospital-accent to-hospital-primary rounded-xl flex items-center justify-center mb-4"
              >
                <Image src="/icon/hospital.svg" alt="병원" width={28} height={28} className="brightness-0 invert" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-hospital-foreground">
                병원 정보 확인
              </h3>
              <p className="text-hospital-muted leading-relaxed">
                병원 목록에서 이름, 주소, 전화번호 등 상세 정보를 확인하세요. 24시간 응급 병원 여부도 표시됩니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer with Fade-in */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white border-t border-gray-200 py-12 px-6"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-xl font-bold text-hospital-primary mb-4">
            동물병원 찾기
          </div>
          <p className="text-sm text-hospital-muted mb-6">
            전국 동물병원 정보를 한눈에
          </p>
          <div className="text-xs text-hospital-muted">
            {SITE_INFO.copyright}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
