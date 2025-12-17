import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      // 모바일: 기본 (0-599px) - prefix 없이 사용
      // 태블릿: 600px 이상
      tablet: "600px",
      // PC: 1024px 이상
      pc: "1024px",
    },
    extend: {
      colors: {
        hospital: {
          primary: "#10b981",
          "primary-dark": "#059669",
          "primary-light": "#34d399",
          secondary: "#3b82f6",
          accent: "#f59e0b",
          background: "#f8fafc",
          foreground: "#0f172a",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-pretendard)",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
